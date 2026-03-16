import { StorageAdapter } from "../types";

export class WebStorageAdapter implements StorageAdapter {
  private storage: Storage;

  constructor(type: "local" | "session", private prefix = "") {
    this.storage =
      type === "local" ? window.localStorage : window.sessionStorage;
  }

  private k(key: string) {
    return this.prefix + key;
  }

  async put(key: string, value: any): Promise<void> {
    const val =
      typeof value === "object" ? JSON.stringify(value) : String(value);
    this.storage.setItem(this.k(key), val);
  }

  async get<T = any>(key: string): Promise<T | null> {
    const raw = this.storage.getItem(this.k(key));
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as unknown as T;
    }
  }

  async delete(key: string): Promise<void> {
    this.storage.removeItem(this.k(key));
  }

  async clear(): Promise<void> {
    this.storage.clear();
  }
}
