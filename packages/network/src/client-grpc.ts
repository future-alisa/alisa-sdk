import {
  createClient,
  type Client,
  type Interceptor,
} from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import type { DescService } from "@bufbuild/protobuf";

export interface AlisaGrpcConfig {
  baseUrl: string;
  interceptors?: Interceptor[];
}

export class AlisaGrpcClient<T extends DescService> {
  public client: Client<T>;

  constructor(service: T, config: AlisaGrpcConfig) {
    const transport = createConnectTransport({
      baseUrl: config.baseUrl,
      interceptors: config.interceptors,
    });
    this.client = createClient(service, transport);
  }
}
