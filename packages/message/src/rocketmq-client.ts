import { Producer, PushConsumer, Message } from "apache-rocketmq";

export interface RocketMQConfig {
  nameServer: string;
  groupName: string;
}

export class AlisaRocketMQClient {
  private producer: Producer | null = null;

  constructor(private config: RocketMQConfig) {}

  // 初始化生产者
  async initProducer() {
    if (!this.producer) {
      this.producer = new Producer(this.config.groupName, {
        nameServer: this.config.nameServer,
      });
      await this.producer.start();
    }
    return this.producer;
  }

  // 发送消息
  async send(topic: string, tag: string, body: string) {
    const p = await this.initProducer();
    const msg = new Message(topic, tag, body);
    return new Promise((resolve, reject) => {
      p.send(msg, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  // 消费者由于逻辑较重，建议返回实例让用户自行配置监听
  createConsumer(topic: string, tag: string = "*") {
    const consumer = new PushConsumer(this.config.groupName, {
      nameServer: this.config.nameServer,
    });
    consumer.subscribe(topic, tag);
    return consumer;
  }
}
