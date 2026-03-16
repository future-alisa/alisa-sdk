import { RequestPlugin } from "../axios-client";
import axios from "axios";

/**
 * 动态配置插件：支持动态 Bearer Token 和动态 BaseURL
 */
export const DynamicConfigPlugin = (getters: {
  getToken: () => string | null;
  getBaseUrl: () => string;
}): RequestPlugin => ({
  name: "dynamic-config",
  beforeRequest: (ctx) => {
    ctx.config.baseURL = getters.getBaseUrl();
    const token = getters.getToken();
    if (token) {
      ctx.config.headers.Authorization = `Bearer ${token}`;
    }
  },
});

/**
 * 自动重试插件
 */
export const RetryPlugin = (maxRetries = 3, delay = 1000): RequestPlugin => ({
  name: "auto-retry",
  onError: async (ctx) => {
    const config = ctx.config as any;
    config._retryCount = config._retryCount || 0;

    if (config._retryCount < maxRetries) {
      config._retryCount++;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return axios(config).then((res) => {
        ctx.response = res.data;
      });
    }
  },
});

/**
 * 错误处理插件
 */
export const HandleErrorPlugin = (
  onErrorMessage: (msg: string) => void
): RequestPlugin => ({
  name: "handle-error",
  onResponse: (ctx) => {
    const { code, message, data } = ctx.response;
    if (code !== 200) {
      onErrorMessage(message || "未知错误");
      throw new Error(message);
    }
    ctx.response = data;
  },
});
