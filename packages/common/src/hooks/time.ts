import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn"; // 如果需要中文支持

// 加载插件
dayjs.extend(relativeTime);

/**
 * SDK 时间工具类
 */
export const timeUtils = {
  /**
   * 格式化日期
   * @param date 可选：Date对象、时间戳、ISO字符串
   * @param template 默认 'YYYY-MM-DD HH:mm:ss'
   */
  format(
    date?: Date | number | string,
    template = "YYYY-MM-DD HH:mm:ss"
  ): string {
    return dayjs(date).format(template);
  },

  /**
   * 获取友好时间（如：3分钟前，1小时前）
   * @param date
   */
  fromNow(date: Date | number | string): string {
    return dayjs(date).fromNow();
  },

  /**
   * 获取当前 Unix 时间戳
   * @param unit 's' 秒, 'ms' 毫秒
   */
  now(unit: "s" | "ms" = "ms"): number {
    return unit === "ms" ? dayjs().valueOf() : dayjs().unix();
  },

  /**
   * 基础校验：判断是否为有效日期
   */
  isValid(date: any): boolean {
    return dayjs(date).isValid();
  },

  /**
   * 获取原生 dayjs 对象（以便进行更复杂的操作，如 add/subtract）
   */
  dayjs: dayjs,
};
