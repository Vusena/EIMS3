import { Component, OnInit, ViewChild, } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
// import { DatePipe } from '@angular/common';
import { HttpService } from 'app/core/services/http.service';
import { ApiEndPoints } from 'app/core/common/ApiEndPoints';
// import { MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from '../common/success/success.component';
import { DatePipe } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [DatePipe]
})
export class ReportsComponent implements OnInit {

  errorMessage: any;
  startDate: any;
  closingDate: any;
  searchControl = new FormControl('');
  alertMessage: any;
  nominees: any;
  nomineestaff: any;
  participants: any;
  total_votes: any;
  scheduleForm: FormGroup;
  dataSource: any;
  region: any;
  department: any;
  votes: any;
  totalNominees: number;
  length: number;
  pageSize: number = 10;
  pageNumber: number = 0;
  pageSizeOptions=[10, 20, 50, 100]


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private httpService: HttpService, public datePipe: DatePipe, private fb: FormBuilder,
  ) { }
  ngAfterViewInit() {
    // Ensure paginator is initialized before accessing it
    if (this.paginator) {
      console.error(this.paginator)
    }
  }

  ngOnInit(): void {
    this.scheduleForm = this.fb.group({
      startDate: ['', Validators.required], // You can set initial values here if needed
      closingDate: ['', Validators.required]
    });

    this.onDateExtend();
    this.getReports();
    this.getAllNominations();
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
            // this.successAlert()
            this.scheduleForm.reset();
            this.alertMessage = res.body.description
          },
          error: (err) => {
            this.errorMessage = err.error.description;
            console.log(this.errorMessage)
            // Handle error here
          }
        });
    }
  }

  onDateExtend(): void {
    this.httpService.get(ApiEndPoints.AWARD_SCHEDULES_SHOW).subscribe({
      next: (res) => {
        console.log(res)
        this.startDate = res.data.startDate;
        this.closingDate = res.data.endDate;
        // This comes as an array of format YYYY/MM/DD
        console.log('startDate:', this.startDate);
        console.log('closingDate:', this.closingDate);

        this.startDate = new Date(res.data.startDate);
        this.closingDate = new Date(res.data.endDate);
        console.log('New startDate:', this.startDate);
        console.log('New closingDate:', this.closingDate);

        console.log(this.scheduleForm)
        this.scheduleForm.patchValue({
          startDate: this.startDate,
          closingDate: this.closingDate,

        });
        // console.log("SheduleForm after patching",this.scheduleForm)
        // console.log("SheduleForm after patching",this.scheduleForm.value)
        // console.log("SheduleForm after patching",this.scheduleForm.value.startDate)
      },
      error: (error) => {

        console.error("There was an error!", error);
      },
    });
  }


  // GETTING ALL REPORTS
  getReports(): void {
    this.httpService.get(ApiEndPoints.AWARD_NOMINATION_REPORTS_nominees).subscribe({
      next: (res) => {
        // console.log(res)
        this.nominees = res.count
        // console.log(this.nominees)
      },
      error: (error) => {
        console.error("There was an error!", error);
      },
    });

    this.httpService.get(ApiEndPoints.AWARD_NOMINATION_REPORTS_participants).subscribe({
      next: (res) => {
        // console.log(res)
        this.participants = res.count
        // console.log(this.participants)
      },
      error: (error) => {
        console.error("There was an error!", error);
      },
    })

    this.httpService.get(ApiEndPoints.AWARD_NOMINATION_REPORTS_participants).subscribe({
      next: (res) => {
        // console.log(res)
        this.total_votes = res.count
        // console.log(this.total_votes)
      },
      error: (error) => {
        console.error("There was an error!", error);
      },
    })
  }

  getAllNominations(): void {
    const pagedddd = this.paginator;
    console.log(pagedddd)
    this.httpService.getAllnominees(ApiEndPoints.AWARD_NOMINATION_INDEX, null, this.pageNumber, this.pageSize).subscribe({
      next: (res) => {
        this.dataSource = res.data.content;
        console.log(res)
        // console.log('dataSource', this.dataSource)
        this.length = res.data.totalElements;

        this.dataSource.forEach(item => {
          // Extracting variables from each item
          this.region = item.region;
          this.department = item.department;
          this.nomineestaff = item.staff
          this.votes = item.count

        });
      },
      error: (error) => {

        console.error("There was an error!", error);
      },
    });
  }

  handlePage(event: PageEvent) {
    this.pageNumber = event.pageIndex; // Update current page number
    this.pageSize = event.pageSize; // Update items per page
    this.getAllNominations(); // Fetch data for the new page
  }

}
