import { io, Socket, SocketOptions } from "socket.io-client";

export class AlisaWSClient {
  public socket: Socket;

  constructor(url: string, options?: Partial<SocketOptions>) {
    this.socket = io(url, {
      reconnectionAttempts: 5,
      ...options,
    });
  }

  onMessage(callback: (data: any) => void) {
    this.socket.on("message", callback);
  }

  send(event: string, data: any) {
    this.socket.emit(event, data);
  }
}
