import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IntergrityAwardComponent } from 'app/core/features/intergrity-award/intergrity-award.component';




@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent implements OnInit {

constructor(public dialog: MatDialog,private dialogRef: MatDialogRef<IntergrityAwardComponent>){}

  ngOnInit(): void {
   
  }
  


onClear(): void {
  this.dialogRef.close(null);
}



}
