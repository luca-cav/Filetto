import { Component, computed, inject, signal } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatError } from "@angular/material/form-field";
@Component({
  selector: 'app-size-pop-up',
  imports: [FormsModule, MatRadioModule, MatError, MatDialogActions, MatDialogContent, MatButtonModule],
  templateUrl: './size-pop-up.html',
  styleUrl: './size-pop-up.css',
})
export class SizePopUp {
  readonly dialogRef = inject(MatDialogRef<SizePopUp>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  size=signal<number>(3);
  customSize=signal<number>(3);
  disabled=computed(()=>{
    if (this.size() === 6) {
      return this.customSize() <= 0 || this.customSize() > 10;
    }
    return false;
  });

  OnClick(){
    console.log(this.customSize(),"  ",this.size())
    if (Number(this.size()) === 6) {
      if (this.customSize() > 0 && this.customSize() <= 10) {
        this.dialogRef.close({ size: this.customSize() });
        return;
      }
      return;
    }else{
      this.dialogRef.close({ size: this.size() });
    }
  }
}
