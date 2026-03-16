import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { StorageAdapter, S3Config } from "../types";

export class S3Adapter implements StorageAdapter {
  private client: S3Client;
  private bucket: string;

  constructor(config: S3Config) {
    this.bucket = config.bucket;
    this.client = new S3Client({
      region: config.region,
      credentials: config.credentials,
      endpoint: config.endpoint,
    });
  }

  async put(key: string, value: any): Promise<void> {
    const body = typeof value === "object" ? JSON.stringify(value) : value;
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: body,
        ContentType:
          typeof value === "object" ? "application/json" : "text/plain",
      })
    );
  }

  async get<T = any>(key: string): Promise<T | null> {
    try {
      const { Body } = await this.client.send(
        new GetObjectCommand({
          Bucket: this.bucket,
          Key: key,
        })
      );
      const str = await Body?.transformToString();
      if (!str) return null;
      try {
        return JSON.parse(str);
      } catch {
        return str as any;
      }
    } catch {
      return null;
    }
  }

  async delete(key: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({ Bucket: this.bucket, Key: key })
    );
  }

  async clear(): Promise<void> {
    throw new Error(
      "Clear operation is not supported on S3 for safety reasons."
    );
  }
}
