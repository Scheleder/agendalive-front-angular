import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LiveService } from 'src/app/shared/service/live.service';

@Component({
  selector: 'app-live-delete-dialog',
  templateUrl: './live-delete-dialog.component.html',
  styleUrls: ['./live-delete-dialog.component.css']
})
export class LiveDeleteDialogComponent implements OnInit {
  

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    private rest: LiveService,
    public dialogRef: MatDialogRef<LiveDeleteDialogComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  deleteLive(id: string){
    console.log("Deletando "+id);
    this.rest.deleteLives(id).subscribe();
    this.dialogRef.close(false);
    window.location.reload();
    
  }

}