import { Component, model, Signal, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Match } from "./match/match";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Match],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
