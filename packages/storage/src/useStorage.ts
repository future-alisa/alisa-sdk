// packages/storage/src/useStorage.ts
import { S3Adapter } from "./adapters/s3";
import { WebStorageAdapter } from "./adapters/web";
import { StorageAdapter, StorageOptions } from "./types";

export function useStorage(options: StorageOptions): StorageAdapter {
  const { driver, s3, prefix = "" } = options;

  // 显式返回 StorageAdapter 接口，而不是具体的类
  if (driver === "s3") {
    return new S3Adapter(s3!) as StorageAdapter;
  }

  return new WebStorageAdapter(
    driver as "local" | "session",
    prefix
  ) as StorageAdapter;
}
