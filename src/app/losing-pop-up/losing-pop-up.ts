import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { Player } from '../shared/models/player';

interface LoseDialogData{
  player:Player
}

@Component({
  selector: 'app-losing-pop-up',
  imports: [MatDialogContent, MatDialogTitle],
  templateUrl: './losing-pop-up.html',
  styleUrl: './losing-pop-up.css',
})
export class LosingPopUp {
  readonly dialogRef = inject(MatDialogRef<LosingPopUp>);
  readonly data = inject<LoseDialogData>(MAT_DIALOG_DATA);
  player =model(this.data.player);
  loss="\\loss.png";
}
