import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket:Socket) {
  }

  enterRoom(roomId: string) {
    this.socket.emit("enter", roomId);
  }

  getRoomId() {
    this.socket.emit("currentRoomId");
    return this.socket.fromEvent<string>('roomId');
  }

  updateNPlayers() {
    return this.socket.fromEvent<number>('updateNPlayers');
  }

  sendPlayerInfo(playerInfo: Player, gridSize?:number) {
    this.socket.emit('myPlayerInfo', { playerInfo, gridSize });
  }

  getOtherPlayerInfo() {
    return this.socket.fromEvent<any>('otherPlayerInfo');
  }

  startMatch() {
    this.socket.emit('start');
  }

  getStartMatch() {
    return this.socket.fromEvent<any>('startMatch');
  }

  sendMove(matchGrid: any) {
    this.socket.emit('sendMove', { matchGrid });
  }

  getMove() {
    return this.socket.fromEvent<any>('move');
  }

  getPlayerDisconnect() {
    return this.socket.fromEvent<any>('playerDisconnect');
  }
}

