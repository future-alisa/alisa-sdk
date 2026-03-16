// src/rocketmq.d.ts

declare module "apache-rocketmq" {
  export class Message {
    constructor(topic: string, tags: string, body: string);
    setKeys(keys: string): void;
    setBody(body: string): void;
  }

  export interface ProducerOptions {
    nameServer: string;
    groupName?: string;
    compressLevel?: number;
    sendMessageTimeout?: number;
    maxMessageSize?: number;
  }

  export class Producer {
    constructor(groupId: string, options: ProducerOptions);
    start(callback?: (err: Error | null) => void): void;
    send(
      message: Message,
      callback: (err: Error | null, result: any) => void
    ): void;
    stop(callback?: (err: Error | null) => void): void;
  }

  export interface PushConsumerOptions {
    nameServer: string;
    threadCount?: number;
    maxBatchSize?: number;
  }

  export class PushConsumer {
    constructor(groupId: string, options: PushConsumerOptions);
    subscribe(topic: string, tags: string): void;
    on(event: "message", callback: (msg: any, ack: any) => void): void;
    start(callback?: (err: Error | null) => void): void;
    stop(callback?: (err: Error | null) => void): void;
  }
}
