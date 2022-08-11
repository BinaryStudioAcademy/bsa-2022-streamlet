import { SocketIo } from '~/shared/types/socket/socket-io.type';
import * as http from 'http';
import { createIoInstance } from '~/websockets/io';
/*eslint-disable */
export class SocketService {
  private io: SocketIo | undefined;

  subscribe(httpServer: http.Server) {
    this.io = createIoInstance(httpServer);
    this.io.on('connection', (socket) => {
      console.log(`${socket.id} connected`);

      socket.on('disconnect', async () => {
        console.log(`${socket.id} connection lost`);
      });

      socket.on('manual-disconnection', async () => {
        console.log(`${socket.id} disconnected`);
      });

      socket.on('say-hello', ({ message }: { message: string }) => {
        console.log(`message from client ${socket.id} -> ${message}`);
        socket.emit('say-hello-done', { message: 'hi' });
      });
    });
    this.io.on('connect_failed', () => {
      console.log('Connection failed');
    });

    this.io.on('error', () => {
      console.log('Some error');
    });
  }

  // addUser(userId: string, socketId: string) {
  //     if (userId) {
  //         if (this.connectedUsers[userId]) {
  //             this.connectedUsers[userId] = this.connectedUsers[userId].concat([
  //                 socketId
  //             ]);
  //         } else {
  //             this.connectedUsers[userId] = [socketId];
  //         }
  //     }
  //     console.log('Connected users:', this.connectedUsers)
  // }

  // deleteUser(socketId: string) {
  //     Object.keys(this.connectedUsers).forEach(key => {
  //         const filteredConnections = this.connectedUsers[key].filter(
  //             existedSocketId => existedSocketId !== socketId
  //         );
  //         if (filteredConnections.length) {
  //             this.connectedUsers[key] = filteredConnections;
  //         } else {
  //             delete this.connectedUsers[key];
  //         }
  //     });
  //     console.log('Connected users:', this.connectedUsers)
  // }

  // pushToAllClients = (name: string, payload: any) => {
  //     this.io.emit(name, payload);
  // }

  // pushToClientById = (userId: string, payload: any, payloadType?: PayloadType) => {
  //     const socketIds = this.connectedUsers[userId];

  //     if (!socketIds) return;

  //     const sendData = (socketName: string, payload: any) =>
  //         socketIds.forEach(id => this.io.to(`${id}`).emit(socketName, payload));

  //     switch (payloadType) {
  //         case PayloadType.UpdateUser:
  //             sendData('updateUserData', payload);
  //             break;
  //         default:
  //             sendData('notification', payload);
  //             break;
  //     }
  // }

  // pushToDiscussionParticipants(roomName: string, body: CourseMessageBody) {
  //     console.log(`sending to [${roomName}]: ${body}`)
  //     this.io.emit(roomName, body);
  // }
}
/*eslint-enable */
