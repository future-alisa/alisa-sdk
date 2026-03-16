import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// 插件只加载一次
dayjs.extend(relativeTime);

/**
 * 时间处理 Hook
 * @param defaultTemplate 默认格式化模版
 */
export function useTime(defaultTemplate = "YYYY-MM-DD HH:mm:ss") {
  /**
   * 基础格式化
   */
  const format = (date?: Date | number | string, template?: string) => {
    return dayjs(date).format(template ?? defaultTemplate);
  };

  /**
   * 相对时间
   */
  const fromNow = (date: Date | number | string) => {
    return dayjs(date).fromNow();
  };

  /**
   * 快捷获取 Unix 时间戳
   */
  const getUnix = () => dayjs().unix();

  /**
   * 判断某个日期是否在另一个日期之后
   */
  const isAfter = (target: string | Date, base: string | Date = new Date()) => {
    return dayjs(target).isAfter(dayjs(base));
  };

  // 返回工具方法
  return {
    format,
    fromNow,
    getUnix,
    isAfter,
    // 直接暴露底层实例，方便极端情况下的扩展
    instance: dayjs,
  };
}
