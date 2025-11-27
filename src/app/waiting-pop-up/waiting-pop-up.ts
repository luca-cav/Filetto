import { Component, effect, inject, model, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { SocketService } from '../shared/services/socket.service';
@Component({
  selector: 'app-waiting-pop-up',
  imports: [ MatDialogContent, MatDialogTitle],
  templateUrl: './waiting-pop-up.html',
  styleUrl: './waiting-pop-up.css',
})
export class WaitingPopUp implements OnInit {

  constructor(private readonly socketService: SocketService) {
    effect(() => {
      console.log("NConnectedPlayers changed: ", this.nConnectedPlayers()); 
      if (this.nConnectedPlayers() === 2) {
        this.dialogRef.close(true); 
      }
    });
  }

  readonly dialogRef = inject(MatDialogRef<WaitingPopUp>);
  nConnectedPlayers = model(1);
  linkRoom: string = '';

  ngOnInit(): void {
    console.log("WaitingPopUp initialized");
    this.socketService.getRoomId().subscribe((roomId: string) => {
      console.log("Room: ", roomId);
      this.linkRoom = window.location.href+"invite/"+roomId;
    });

    this.socketService.updateNPlayers().subscribe((nPlayers: number) => {
      console.log("NPlayers: ", nPlayers);
      this.nConnectedPlayers.set(nPlayers);
    });   
  }
}
