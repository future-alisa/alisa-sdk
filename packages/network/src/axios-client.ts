import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

// 定义上下文，方便插件间通信
export interface RequestContext<T = any> {
  config: InternalAxiosRequestConfig;
  response?: T; // 响应数据
  error?: any; // 错误对象
  meta: Record<string, any>; // 用于插件间传递状态，比如重试次数
}

// 定义插件函数的类型
export interface RequestPlugin {
  name: string;
  beforeRequest?: (ctx: RequestContext) => Promise<void> | void;
  onResponse?: (ctx: RequestContext) => Promise<void> | void;
  onError?: (ctx: RequestContext) => Promise<void> | void;
}

export class AxiosClient {
  private instance: AxiosInstance;
  private plugins: RequestPlugin[] = [];

  constructor(baseConfig: AxiosRequestConfig) {
    this.instance = axios.create(baseConfig);
  }

  // 注册插件
  use(plugin: RequestPlugin) {
    const isDuplicate = this.plugins.some((p) => p.name === plugin.name);

    if (isDuplicate) {
      console.warn(
        `[AxiosClient] 插件 "${plugin.name}" 已注册，请勿重复注册。`
      );
      return this;
    }

    this.plugins.push(plugin);
    console.log(`注册 ${plugin.name} 插件`);
    return this;
  }

  // 核心请求方法
  async request<T = any>(config: AxiosRequestConfig): Promise<T> {
    // 构造请求上下文
    const ctx: RequestContext = {
      config: { ...config } as InternalAxiosRequestConfig,
      meta: {},
    };

    try {
      // 1. 执行请求前钩子
      for (const p of this.plugins) {
        if (p.beforeRequest) await p.beforeRequest(ctx);
      }

      const res = await this.instance(ctx.config);
      ctx.response = res.data;

      // 2. 执行响应钩子
      for (const p of this.plugins) {
        if (p.onResponse) await p.onResponse(ctx);
      }

      return ctx.response;
    } catch (err: any) {
      ctx.error = err;
      // 3. 执行错误钩子
      for (const p of this.plugins) {
        if (p.onError) await p.onError(ctx);
      }
      return Promise.reject(ctx.error);
    }
  }

  // 便捷方法封装
  /**
   * GET 请求：通常用于获取数据
   */
  get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, method: "GET" });
  }

  /**
   * POST 请求：通常用于提交数据（新建）
   */
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, method: "POST", data });
  }

  /**
   * PUT 请求：通常用于全量更新数据
   */
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, method: "PUT", data });
  }

  /**
   * PATCH 请求：通常用于局部更新数据
   */
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, method: "PATCH", data });
  }

  delete<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, method: "DELETE", data });
  }
  /**
   * HEAD 请求：只获取响应头
   */
  head<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, method: "HEAD" });
  }

  /**
   * OPTIONS 请求：获取服务器支持的 HTTP 方法
   */
  options<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, method: "OPTIONS" });
  }
}
