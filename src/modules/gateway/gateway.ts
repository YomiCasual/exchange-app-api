import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log({ socket: socket.id });
    });
  }

  @SubscribeMessage('new_message')
  onNewMessage(@MessageBody() body: any) {
    this.server.emit('send_message', {
      msg: 'new message',
      content: body,
    });
  }
}
