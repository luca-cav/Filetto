import { Component, inject, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PlayerDialogData } from '../shared/models/player';

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
  name = model();
  symbol = model();
  value = model();

  ngOnInit(){
    console.log(this.id())
    if(this.id()+1===1){
      this.symbol.set("clear");
      this.value.set(1);
    }else{
      this.symbol.set("radio_button_unchecked");
      this.value.set(-1)
    }
    console.log(this.symbol())
    
  }

  OnClick(){
    this.dialogRef.close({name:this.name(), symbol:this.symbol(), value:this.value(), id:this.id()});
  }

  onNoClick(): void {
    this.dialogRef.close({symbol:this.symbol(), value:this.value(), id:this.id()});
  }
}