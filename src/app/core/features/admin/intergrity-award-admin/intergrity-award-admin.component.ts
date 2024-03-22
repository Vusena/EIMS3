import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiEndPoints } from 'app/core/common/ApiEndPoints';
import { AuthService } from 'app/core/services/auth.service';
import { HttpService } from 'app/core/services/http.service';
import { SuccessComponent } from '../../common/success/success.component';

@Component({
  selector: 'app-intergrity-award-admin',
  templateUrl: './intergrity-award-admin.component.html',
  styleUrl: './intergrity-award-admin.component.scss'
})
export class IntergrityAwardAdminComponent {
  filteredkrastaff: any[] = [];
  searchText: string = '';
  specificName: string = '';
  errorMessage: string = '';
   krastafflist: any;
   status_code:any;
   staff_number:any;
   department:any;
   region:any;
  success: boolean = false;
  alertMessage:string;
  nomineeData:FormGroup;
  missingdetails:string;
  isConfirmed: boolean;

   
  integrityAndProfessionalism: boolean = null;
  acceptsResponsibility: boolean = null;
  maintainsOpenCommunications: boolean = null;
  hasKRAValues: boolean | null = null; // Initialize to null
  contributionDescription: string = '';
  
  nomineeError:"";

 
  constructor(private httpService: HttpService, private fb: FormBuilder,private dialog: MatDialog, 
    private authService: AuthService
   ) { 
      this.nomineeData= this.fb.group({
        contributionDescription1: ['', Validators.required]
      });
    }
    

  onSubmit(event: any): void {
    event.preventDefault();
    const body = { staffNo: this.searchText };
    this.httpService.postData(`${ApiEndPoints.AWARD_NOMINATIONS_SEARCH}`, body,)
    .subscribe({
    next: (res) => {
     console.log( "Response", res)
     this.krastafflist=res.body.data;
     console.log('krastafflist', this.krastafflist);
     console.log('name', this.krastafflist.name)
     console.log( res.status)
     this.status_code=res.status;
     console.log('status code ', this.status_code);

      if (this.status_code === 200) {
        this.errorMessage="";
        // this.cd.detectChanges();
        this.specificName=this.krastafflist.name;
        this.department=this.krastafflist.department.name;
        this.region=this.krastafflist.region.name;
        this.staff_number=this.krastafflist.staffNo;
      } else{

      }
      },
      error: (err) => {
        console.log(err.error.description);
        this.specificName="";
        this.department="";
        this.region="";
        this.staff_number="";
        this.errorMessage=err.error.description;
        this.alertMessage="";
        console.log(this.errorMessage);
      }
    })
  }

  toggleTextVisibility(): void {
    this.specificName='';
   }

   onConfirm(){
    const staff_numberr: string = this.staff_number;
    const staff_name:string=this.specificName;
    this.isConfirmed = true; 
    this.errorMessage="";
    // this.cd.detectChanges();
    this.alertMessage = `Thank you for confirming, ${staff_name}`;
    // this.cd.detectChanges();
    
  }
   isConfirmationEnabled(): boolean {
    // Check if all necessary details are filled
    return !!this.staff_number && !!this.specificName;
  }

  onNominate(){
    if (this.isConfirmed && this.areAllFieldsFilled()) {
      // Submit the form data
         const nomineeData = {
      integrity: this.convertToNumber(this.integrityAndProfessionalism),
      responsibility: this.convertToNumber(this.acceptsResponsibility),
      communication: this.convertToNumber(this.maintainsOpenCommunications),
      coreValues:  this.convertToNumber(this.hasKRAValues),
      description: this.contributionDescription,
      nominee: this.staff_number
    }
    console.log(nomineeData.nominee)
    console.log(nomineeData)
    this.httpService.postData(`${ApiEndPoints.AWARD_NOMINATION_STORE}`, nomineeData,)
    .subscribe({
    next: (res) => {
     console.log(res)
     this.alertMessage=res.body.description
     this.successAlert();
     window.location.reload();

      },

      error: (err) => {
        this.nomineeError=err.error.description;
        console.log(this.nomineeError)
      }
          })
         
  }else if (!this.isConfirmed) {
    this.errorMessage = 'Please confirm your selection before nominating';
    console.log("Please confirm your selection before nominating")
  }
  else {
    // If any field is missing, display an error message or take appropriate action
    console.log('Please fill in all the fields')
    this.missingdetails="Please fill in all the fields";
    alert("Please fill in all the fields")


  }
  }

  successAlert(): void {
    this.dialog.open(SuccessComponent, {
      width: '500px',
      height:'600px'
    });
      }


      areAllFieldsFilled(): boolean {
        return (
          this.integrityAndProfessionalism !== null &&
          this.acceptsResponsibility !== null &&
          this.maintainsOpenCommunications !== null &&
          this.hasKRAValues !== null &&
          this.contributionDescription.trim() !== ''
        );
      }
      private convertToNumber(value: boolean): number {
        return value ? 1 : 2;
      } 
  resetForm(): void {
    this.nomineeData.reset({
          integrityAndProfessionalism: false,
          acceptsResponsibility: false,
          maintainsOpenCommunications: false,
          hasKRAValues: false,
          contributionDescription: ''
        });
      }

      isAdmin(): boolean {
        // Check if the user has 'admin' role
        const userRoles = this.authService.getUserRoles();
        return userRoles.includes('ADMIN');
      }
      isUser():boolean{
        const userRoles = this.authService.getUserRoles();
        return userRoles.includes('USER');
      }



}
