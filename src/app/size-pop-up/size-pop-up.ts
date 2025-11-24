import { Component, inject, signal } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatError, MatFormField } from "@angular/material/form-field";
@Component({
  selector: 'app-size-pop-up',
  imports: [FormsModule, MatRadioModule, MatError, MatFormField, MatDialogActions, MatDialogContent],
  templateUrl: './size-pop-up.html',
  styleUrl: './size-pop-up.css',
})
export class SizePopUp {
  readonly dialogRef = inject(MatDialogRef<SizePopUp>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  size=signal<number>(3);
  customSize=signal<number>(0);

  OnClick(){
    console.log(this.customSize(),"  ",this.size())
    if(this.customSize()==0){
      console.log("in",Number(this.size()))
      this.dialogRef.close({size:Number(this.size())});
    }
    this.dialogRef.close({size:this.customSize()});
  }

  disabled(){
    return this.size()==6 && (this.customSize()==0 && this.customSize()>10)
  }

}
