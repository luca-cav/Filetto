import { Component, inject, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Player, Player_DEFAULT, PlayerDialogData } from '../shared/models/player';

@Component({
  selector: 'app-player-creation',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './player-creation.html',
  styleUrl: './player-creation.css',
})
export class PlayerCreation implements OnInit{
  readonly dialogRef = inject(MatDialogRef<PlayerCreation>);
  readonly data = inject<PlayerDialogData>(MAT_DIALOG_DATA);
  readonly id = model(this.data.id);
  player=model<Player>(this.data.player);
  name=model<string>("");

  ngOnInit(){
    console.log(this.id())
    if(this.id()===0){
      this.player().value=1;
    }else{
      this.player().value=-1;
    }
  }

  OnClick(){
    if(this.name()!==""){
      this.player().name=this.name();
    }
    console.log(this.id());
    this.dialogRef.close({player:this.player(), id:this.id()});
  }

  onNoClick(): void {
    this.dialogRef.close({player:this.player(), id:this.id()});
  }
}