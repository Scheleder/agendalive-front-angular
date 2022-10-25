import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Live } from 'src/app/shared/model/live.model';
import { LiveService } from 'src/app/shared/service/live.service';
import { LiveDeleteDialogComponent } from '../live-delete-dialog/live-delete-dialog.component';


@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {
  livesPrevious!: Live[];
  livesNext!: Live[];
  next: boolean = false;
  previous: boolean = false;

  constructor(
   
    public liveService : LiveService,
    public sanitizer : DomSanitizer,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.getLives();
   
  }

  /* deleteLive(id: string){
    console.log("Deletando "+id);
    this.liveService.deleteLives(id).subscribe();
    window.location.reload();
    
  } */

  /* onDelete(key:string){
    this.deleteDialog('Você tem certeza que deseja excluir esta live?', key);
  } */

  onDelete(key:string){
    
    this.dialog.open(LiveDeleteDialogComponent, {
      width: '300px',
      panelClass: 'confirm-dialog-container',
      position: { top: "10px" },
      disableClose: true,
      data :{
        message : 'Deseja excluir esta live?',
        id: key
      }
    });
  }


  getLives(){

    this.liveService.getLivesWithFlag('previous').subscribe(data=>{
      this.livesPrevious = data.content;
      console.log(this.livesPrevious);
      this.livesPrevious.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
        this.previous=true;
    });

    this.liveService.getLivesWithFlag('next').subscribe(data=>{
      this.livesNext = data.content;
      console.log(this.livesNext);
      this.livesNext.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
      this.next=true;
    });

  }

}
