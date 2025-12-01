
export interface Player{
    name:string;
    symbol:string;
    value:number;
    wins:number;
    draws:number;
    losses:number;
}

export const Player_DEFAULT :Player={
    name: "Giocatore 1",
    symbol: "clear",
    value:0,
    wins: 0,
    draws: 0,
    losses: 0
}

export const Player_DEFAULT2 :Player={
    name: "Giocatore 2",
    symbol: "radio_button_unchecked",
    value:0,
    wins: 0,
    draws: 0,
    losses: 0
}

export interface PlayerDialogData{
  player:Player;
  id:number;
}
