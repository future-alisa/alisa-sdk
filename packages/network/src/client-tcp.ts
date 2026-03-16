import net from "net";

export class AlisaTCPClient {
  private client: net.Socket;

  constructor() {
    this.client = new net.Socket();
  }

  connect(port: number, host: string) {
    return new Promise((resolve, reject) => {
      this.client.connect(port, host, () => resolve(this.client));
      this.client.on("error", reject);
    });
  }

  write(data: string | Buffer) {
    this.client.write(data);
  }
}
