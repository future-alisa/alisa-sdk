import {
  Kafka,
  Producer,
  Consumer,
  KafkaConfig,
  ProducerConfig,
  ConsumerConfig,
} from "kafkajs";

export class AlisaKafkaClient {
  private kafka: Kafka;
  private producer: Producer | null = null;
  private consumer: Consumer | null = null;

  constructor(config: KafkaConfig) {
    this.kafka = new Kafka(config);
  }

  // 生产者封装
  async getProducer(config?: ProducerConfig) {
    if (!this.producer) {
      this.producer = this.kafka.producer(config);
      await this.producer.connect();
    }
    return this.producer;
  }

  // 消费者封装
  async createConsumer(
    groupId: string,
    config?: Omit<ConsumerConfig, "groupId">
  ) {
    const consumer = this.kafka.consumer({ groupId, ...config });
    await consumer.connect();
    return consumer;
  }

  // 发送消息简化版
  async send(topic: string, message: string | object) {
    const p = await this.getProducer();
    const value =
      typeof message === "object" ? JSON.stringify(message) : message;
    return p.send({
      topic,
      messages: [{ value }],
    });
  }

  async disconnect() {
    await Promise.all([
      this.producer?.disconnect(),
      this.consumer?.disconnect(),
    ]);
  }
}
