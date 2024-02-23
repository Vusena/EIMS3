import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { LayoutModule } from '../../layout/layout.module';


import { GiftsGivenOutComponent } from 'app/core/features/gifts-given-out/gifts-given-out.component';
import { GiftsReceivedComponent } from 'app/core/features/gifts-received/gifts-received.component';
import { GroupConflictComponent } from 'app/core/features/group-conflict/group-conflict.component';
import { IndividualConflictComponent } from 'app/core/features/individual-conflict/individual-conflict.component';
import { DashboardComponent } from 'app/core/features/dashboard/dashboard.component';
import { PoliciesComponent } from 'app/core/features/policies/policies.component';
import { FaqsComponent } from 'app/core/features/faqs/faqs.component';
import { LogOutComponent } from 'app/core/features/log-out/log-out.component';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {MatSliderModule} from '@angular/material/slider';




@NgModule({
  declarations: [
      DashboardComponent,
      IndividualConflictComponent,
      GroupConflictComponent,
      GiftsReceivedComponent,
      GiftsGivenOutComponent,
      PoliciesComponent,
      FaqsComponent,
      LogOutComponent
  ],
  
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    LayoutModule,
    ReactiveFormsModule,

    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSliderModule


  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class MainLayoutModule { }
