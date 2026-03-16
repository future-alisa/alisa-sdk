export interface StorageAdapter {
  put(key: string, value: any): Promise<void>;
  get<T = any>(key: string): Promise<T | null>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

export interface S3Config {
  region: string;
  bucket: string;
  endpoint?: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
}

export type StorageDriver = "s3" | "local" | "session";

export interface StorageOptions {
  driver: StorageDriver;
  s3?: S3Config;
  prefix?: string;
}
