import { Component, inject, model } from '@angular/core';
import { Player } from '../shared/models/player';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

interface WinDialogData{
  player:Player
}

@Component({
  selector: 'app-winning-pop-up',
  imports: [ MatDialogContent, MatDialogTitle],
  templateUrl: './winning-pop-up.html',
  styleUrl: './winning-pop-up.css',
})
export class WinningPopUp {
  readonly dialogRef = inject(MatDialogRef<WinningPopUp>);
  readonly data = inject<WinDialogData>(MAT_DIALOG_DATA);
  player =model(this.data.player);
  trophy="\\trophy.gif";

}
