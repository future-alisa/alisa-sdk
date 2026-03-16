/**
 * ID 生成 Hook
 */
export function useUUId() {
  /**
   * 生成标准 UUID (v4)
   * 使用原生 Crypto API，确保高度随机性
   */
  const uuid = (compact = false): string => {
    let res = "";
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      res = crypto.randomUUID();
    } else {
      res = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    // 如果是 compact 模式，去掉横线，变为 32 位
    return compact ? res.replace(/-/g, "") : res;
  };

  /**
   * 生成随机短 ID (类似 nanoid)
   * @param size 长度，默认 10
   */
  const shortId = (size = 10): string => {
    const alphabet = "useAndr21AFpCBDeFGHiJklmNoPqRStUvWxYz03456789";
    let id = "";
    for (let i = 0; i < size; i++) {
      id += alphabet[(Math.random() * alphabet.length) | 0];
    }
    return id;
  };

  return {
    uuid,
    shortId,
  };
}
