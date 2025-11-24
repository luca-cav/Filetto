import { Component, computed, effect, inject, input, Input, InputSignal, model, OnInit, signal, WritableSignal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { Player, Player_DEFAULT } from '../shared/models/player';
import { MatDialog } from '@angular/material/dialog';
import { PlayerCreation } from '../player-creation/player-creation';
import { WinningPopUp } from '../winning-pop-up/winning-pop-up';
import { Subscription, timer } from 'rxjs';
import { DatePipe } from '@angular/common';
import { SizePopUp } from '../size-pop-up/size-pop-up';

interface Symbol{
  symbol:string;
  value:number;
}

@Component({
  selector: 'app-match',
  imports: [MatCard, MatIconModule, DatePipe ],
  templateUrl: './match.html',
  styleUrl: './match.css',
})
export class Match implements OnInit{
[x: string]: any;
  constructor(){
    effect(()=>{
      if(this.duration()==0){
        this.pauseTimer();
      }
    })
  }

  readonly dialog = inject(MatDialog);
  start =signal<boolean>(false);
  duration=signal<number>(10);
  currentRound =signal(0);
  matchGrid :Symbol[][]=[];
  players :Player[]=[Player_DEFAULT,Player_DEFAULT];
  currentPlayerIndex =computed(()=>this.currentRound()%2 ? 0:1);
  size=3;

  timer: Subscription = new Subscription;
  ngOnInit(): void {
    this.getSize();
    this.getPlayer(1);
    this.getPlayer(0);

  }

  getPlayer(index:number){
    
    const dialogRef = this.dialog.open(PlayerCreation, {
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
        console.log(this.players)
      }
    });
  }

  getSize(){
    const dialogRef = this.dialog.open(SizePopUp);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'+result);
      if (result.size) {
        this.size=result.size;
        console.log(this.size);
      }
    });

  }

  startMatch(){
    this.timer.unsubscribe();
    this.start.set(true);
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
          this.players[(this.currentRound()+1%2)==0 ? 0:1].wins++;
          this.showTrophy((this.currentRound()+1%2)==0 ? 0:1);
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
      if(this.currentRound()>=5){
        if(this.checkWin(this.players[this.currentPlayerIndex()].value*this.size)){
          this.pauseTimer();
          this.players[this.currentPlayerIndex()].wins++;
          this.showTrophy(this.currentPlayerIndex());
          this.currentRound.update(value=>  value-1);
          this.players[this.currentPlayerIndex()].losses++;
          this.start.set(false);
        }else if(this.currentRound()==this.size**2){
          this.pauseTimer();
          this.players[this.currentPlayerIndex()].draws++;
          this.currentRound.update(value=>  value-1);
          this.players[this.currentPlayerIndex()].draws++;
          this.start.set(false);
        }
      }
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
