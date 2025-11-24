
export interface Player{
    name:string;
    symbol:string;
    value:number;
    wins:number;
    draws:number;
    losses:number;
}

export const Player_DEFAULT :Player={
    name: "",
    symbol: "",
    value:0,
    wins: 0,
    draws: 0,
    losses: 0
}

export interface PlayerDialogData{
  name:string,
  id:number,
  symbol:string,
  value:number
}
