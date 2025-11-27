import { Component, inject, model, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogTitle, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-disconnect-pop-up',
  imports: [MatDialogContent, MatDialogTitle],
  templateUrl: './disconnect-pop-up.html',
  styleUrl: './disconnect-pop-up.css',
})
export class DisconnectPopUp{
  readonly dialogRef = inject(MatDialogRef<DisconnectPopUp>);
  readonly data = inject<{name:string}>(MAT_DIALOG_DATA);
  readonly name =model(this.data.name); 
  
}
