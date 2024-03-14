import { Component, OnInit,  } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpService } from 'app/core/services/http.service';
import { ApiEndPoints } from 'app/core/common/ApiEndPoints';
import { MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from '../common/success/success.component';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [DatePipe]
})
export class ReportsComponent implements OnInit {

  errorMessage:any;
  startDate:any;
  endDate:any;
  

  constructor(private httpService:HttpService, private datePipe: DatePipe, private fb: FormBuilder,
    private dialog: MatDialog){}

  scheduleForm: FormGroup;
  dataSource:any;


  ngOnInit(): void {
    this.scheduleForm = this.fb.group({
      startDate: ['',  Validators.required], // You can set initial values here if needed
      closingDate: ['', Validators.required]
    });
    this.getScheduleData()
  }

  successAlert(): void {
    this.dialog.open(SuccessComponent, {
      width: '120vh',
      height: '100vw',
      panelClass: 'full-screen',
      
    });
      }
  onDateSubmit() {
    if (this.scheduleForm.valid) {
      console.log('Raw form values:', this.scheduleForm.value);
      const startDate = this.datePipe.transform(this.scheduleForm.value.startDate, 'yyyy-MM-dd');
      console.log('Transformed start date:', startDate);
      const endDate = this.datePipe.transform(this.scheduleForm.value.closingDate, 'yyyy-MM-dd');
      console.log('Transformed closing date:', endDate);
  
       const scheduleFormm = {
        startDate,
        endDate,
      };
  console.log('This is the form', scheduleFormm)
      this.httpService.postData(`${ApiEndPoints.AWARD_SHEDULES_STORE}`, scheduleFormm,)
      .subscribe({
        next: (res) => {
          console.log(res)
          // Handle successful response here
          console.log("Response", res)
          this.successAlert()
          this.scheduleForm.reset();
        },
        error: (err) => {
          this.errorMessage=err.error.description;
          console.log(this.errorMessage)
          // Handle error here
        }
      });
    
    }
  }

  getScheduleData(): void {
    this.httpService.get(ApiEndPoints.AWARD_SCHEDULES_SHOW).subscribe({
      next: (res) => {
        console.log(res)
       this.dataSource=res.data
       console.log(this.dataSource);
       this.startDate = res.data.startDate;
      this.endDate = res.data.endDate;
    
      //  this.scheduleForm.patchValue({
      //   startDatee: this.datePipe.transform(res.data.startDate, 'dd-MM-yyyy'),
      //   closingDatee: this.datePipe.transform(res.data.endDate, 'dd-MM-yyyy')
      // });

      this.startDate = this.datePipe.transform(res.data.startDate, 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(res.data.endDate, 'dd-MM-yyyy');
     console.log('startDate:', this.startDate);
      console.log('endDate:', this.endDate);


      console.log(this.datePipe.transform(res.data.startDate, 'dd-MM-yyyy'));
      console.log(this.datePipe.transform(res.data.endDate, 'dd-MM-yyyy'));
      console.log('New schedule form ', this.scheduleForm)
     
      },
      error: (error) => {
      
        console.error("There was an error!", error);
      },
    });
  }

  // dayClass = (date: Date): string => {
  //   const startDate = new Date(this.startDate);
  //   const endDate = new Date(this.endDate);
  //   const day = new Date(date);
  
  //   console.log('Checking date:', date);
  //   console.log('Starting Date:', startDate);
  //   console.log('Ending Date:', endDate);
  
  //   // Check if the day is between startDate and endDate
  //   if (day >= startDate && day <= endDate) {
  //     console.log('Highlighting day:', date);
  //     // Return a CSS class to highlight the day
  //     return 'highlight-day';
  //   }
  
  //   // Return an empty string for all other days
  //   return '';
  // }

  // votingPeriod = {
  //   startDatee: new Date(2021, 9, 1), // October 1, 2021
  //   endDatee: new Date(2021, 9, 15) // October 15, 2021
  //   };

  //   eventStyles(date) {
  //     // Define the styles for the voting period
  //     if (date >= this.votingPeriod.startDatee && date <= this.votingPeriod.endDatee) {
  //     // If the date is within the voting period, apply some styles
  //     return {
  //     backgroundColor: 'yellow',
  //     color: 'black'
  //     };
  //     } else {
  //     // Otherwise, return an empty object
  //     return {};
  //     }
  //     }
  
  
}
