import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { Player, Player_DEFAULT } from '../shared/models/player';
import { MatDialog } from '@angular/material/dialog';
import { PlayerCreation } from '../player-creation/player-creation';
import { WinningPopUp } from '../winning-pop-up/winning-pop-up';
import { Subscription, timer } from 'rxjs';
import { DatePipe } from '@angular/common';
import { SizePopUp } from '../size-pop-up/size-pop-up';
import { SocketService } from '../shared/services/socket.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WaitingPopUp } from '../waiting-pop-up/waiting-pop-up';
import {MatButtonModule} from '@angular/material/button';
import { DisconnectPopUp } from '../disconnect-pop-up/disconnect-pop-up';

interface Symbol{
  symbol:string;
  value:number;
}

@Component({
  selector: 'app-match',
  imports: [MatCard, MatIconModule, DatePipe, FormsModule, MatButtonModule ],
  templateUrl: './match.html',
  styleUrl: './match.css',
})
export class Match implements OnInit{
[x: string]: any;
  constructor(private readonly socketService: SocketService) {
    effect(()=>{
      if(this.duration()==0){
        this.pauseTimer();
      }
    })
  }

  readonly dialog = inject(MatDialog);
  readonly route = inject(ActivatedRoute);
  start =signal<boolean>(false);
  duration=signal<number>(10);
  currentRound =signal(0);
  nConnectedPlayers=signal<number>(1);
  currentPlayerIndex =computed(()=>(this.currentRound()%2===0) ? 1:0);
  matchGrid :Symbol[][]=[];
  players :Player[]=[Player_DEFAULT,Player_DEFAULT];
  thisPlayerIndex :number=2;
  size :number =3;
  timer: Subscription = new Subscription;
  currentRoomId: string= '';
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const roomId = params.get('roomId');
      if (roomId) {
        this.socketService.enterRoom(roomId);
        this.getPlayer(1);
        this.thisPlayerIndex=1;
      }else{
        this.waitingPlayer();
        this.getSize();
        this.getPlayer(0);
        this.thisPlayerIndex=0;
      }
    });

    this.socketService.getRoomId().subscribe((roomId: string) => {
      console.log("Room: ", roomId);
      this.currentRoomId=roomId;
    });
    
    this.socketService.getOtherPlayerInfo().subscribe((data:{playerInfo: Player,gridSize:number|undefined}) => {
      console.log("Other Player Info: ", data.playerInfo);
      if(data.gridSize){
        this.players[0]=data.playerInfo;
        this.size=data.gridSize;
      }else{
        this.players[1]=data.playerInfo;
      }
      console.log(this.players)
    });

    this.socketService.getStartMatch().subscribe(() => {
      this.start.set(true);
      this.startMatch();
    });

    this.socketService.getMove().subscribe((matchGrid:Symbol[][]) => {
      console.log("Move received: ", matchGrid);
      this.matchGrid=matchGrid;
      this.duration.set(10);
      this.updateScore();
    });

    this.socketService.getPlayerDisconnect().subscribe(() => {
      console.log("Player disconnected");
      this.pauseTimer();
      this.start.set(false);
      this.currentRound.set(0);
      this.matchGrid=[];
      this.dialog.open(DisconnectPopUp,{disableClose: true, data:{name:this.players[this.thisPlayerIndex===0 ? 1:0].name}});
    });
  }
  
  getPlayer(index:number){
    
    const dialogRef = this.dialog.open(PlayerCreation, {
      disableClose: true,
      data: {id:index},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.name) {
        this.players[result.id]={
          name: result.name,
          symbol: result.symbol,
          value: result.value,
          wins: 0,
          draws: 0,
          losses: 0
        };
        this.socketService.sendPlayerInfo(this.players[result.id]);
        console.log(this.players)
      }
      else{
        this.players[result.id]={
          name: "Giocatore "+(index+1),
          symbol: result.symbol,
          value: result.value,
          wins: 0,
          draws: 0,
          losses: 0
        };
        this.socketService.sendPlayerInfo(this.players[result.id]);
        console.log(this.players)
      }
    });
  }

  getSize(){
    const dialogRef = this.dialog.open(SizePopUp,{disableClose: true});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'+result.size);
      if (result.size) {
        this.size=result.size;
        console.log(this.size);
      }
    });

  }

  waitingPlayer(){
    const dialogRef = this.dialog.open(WaitingPopUp,{disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      this.nConnectedPlayers.set(2);
      this.socketService.sendPlayerInfo(this.players[this.thisPlayerIndex],this.size);
    });
  }

  startMatch(){
    if(!this.start()){
      this.start.set(true);
      this.socketService.startMatch();
    }
    this.timer.unsubscribe();
    this.currentRound.set(1);
    this.matchGrid=[];
    for (let i = 0; i < this.size; i++) {
      this.matchGrid.push([]);
      for (let j = 0; j < this.size; j++) {
        this.matchGrid[i].push({symbol:"",value:0});
      }
    }
    this.startTimer();
  }

  startTimer() {
    this.duration.set(10);
    const source = timer(0, 1000);
    this.timer = source.subscribe({
      next:()=>{
        this.duration.update(value=>value-1);
        if(this.duration()==0){
          this.players[this.currentPlayerIndex()].losses++;
          this.players[this.currentPlayerIndex()===0 ? 1:0].wins++;
          this.showTrophy(this.currentPlayerIndex()===0 ? 1:0);
          this.start.set(false);
        }
      }
    });
  }

  pauseTimer() {
    this.timer.unsubscribe();
  }

  OnCellClick(i :number, j:number){
    console.log("cell="+(i+j));
    console.log("round:",this.currentRound()," player:",this.currentPlayerIndex())
    if(this.currentRound()>0){
      this.duration.set(10);
      this.matchGrid[i][j].symbol=this.players[this.currentPlayerIndex()].symbol;
      this.matchGrid[i][j].value=this.players[this.currentPlayerIndex()].value;
      this.socketService.sendMove(this.matchGrid);
      if(this.currentRound()>=5){
        this.updateScore();
      }else{
        this.currentRound.update(value=>  value+1);
      }
    }
  }

  updateScore(){
    if(this.checkWin(this.players[this.currentPlayerIndex()].value*this.size)){
      this.pauseTimer();
      this.showTrophy(this.currentPlayerIndex());
      console.log("Vince "+this.currentPlayerIndex());
      console.log((this.currentPlayerIndex()===0) ? 1:0)
      this.players[this.currentPlayerIndex()].wins++;
      this.players[!(this.currentRound()%2===0) ? 1:0].losses++;
      this.start.set(false);
    }else if(this.currentRound()==this.size**2){
      this.pauseTimer();
      this.players[this.currentPlayerIndex()].draws++;
      this.players[!(this.currentRound()%2===0) ? 1:0].draws++;
      this.start.set(false);
    }else{
      this.currentRound.update(value=>  value+1);
    }
  }

  showTrophy(index:number){
    console.log(index)
    const dialogRef = this.dialog.open(WinningPopUp, {
      data: {player:this.players[index]},
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  checkWin(winningSum:number){
    console.log(winningSum)
    let diagLeftSum=0;
    let diagRightSum=0;
    for (let i = 0; i < this.size; i++) {
      let vertSum=0;
      let horSum=0;
      for (let j = 0; j < this.size; j++) {
        horSum+=this.matchGrid[i][j].value;
        vertSum+=this.matchGrid[j][i].value;
        if(i==j){
          diagLeftSum+=this.matchGrid[i][j].value;
        }
        if((i+j)==(this.size-1)){
          diagRightSum+=this.matchGrid[i][j].value;
        }
      }
      if(horSum===winningSum || vertSum===winningSum){
        return true;
      }
    }
    if(diagLeftSum === winningSum || diagRightSum === winningSum){
      return true;
    }
    return false;
  }
}
