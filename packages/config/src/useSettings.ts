import { useStorage } from "@alisa-sdk/storage";

/**
 * 通用配置管理 Hook
 * @template T 配置对象的类型
 * @param namespace 存储命名空间
 * @param defaultSettings 默认配置值
 */
export function useSettings<T extends Record<string, any>>(
  namespace: string,
  defaultSettings: T
) {
  const storage = useStorage({ driver: "local", prefix: namespace });
  const STORAGE_KEY = "app_settings";
  // 运行时缓存，减少磁盘 IO
  let _cache: T | null = null;
  /**
   * 获取完整配置
   * 自动合并默认值，确保新版本增加的字段能正常访问
   */
  const getAll = async (): Promise<T> => {
    if (_cache) return _cache; // 如果有缓存直接返回
    const saved = await storage.get<Partial<T>>(STORAGE_KEY);
    _cache = { ...defaultSettings, ...saved };
    return _cache;
  };

  /**
   * 更新部分配置
   * @param patch 需要修改的片段
   */
  const update = async (patch: Partial<T>): Promise<T> => {
    const current = await getAll();
    const next = { ...current, ...patch };
    await storage.put(STORAGE_KEY, next);
    _cache = next; // 更新缓存
    return next;
  };

  /**
   * 获取单个配置项
   */
  const get = async <K extends keyof T>(key: K): Promise<T[K]> => {
    const settings = await getAll();
    return settings[key];
  };

  /**
   * 重置为默认
   */
  const reset = async (): Promise<void> => {
    await storage.put(STORAGE_KEY, defaultSettings);
  };

  return {
    getAll,
    get,
    update,
    reset,
  };
}
