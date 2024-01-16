import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from 'app/core/features/dashboard/dashboard.component';
import { FaqsComponent } from 'app/core/features/faqs/faqs.component';
import { GiftsGivenOutComponent } from 'app/core/features/gifts-given-out/gifts-given-out.component';
import { GiftsReceivedComponent } from 'app/core/features/gifts-received/gifts-received.component';
import { GroupConflictComponent } from 'app/core/features/group-conflict/group-conflict.component';
import { IndividualConflictComponent } from 'app/core/features/individual-conflict/individual-conflict.component';
import { LogOutComponent } from 'app/core/features/log-out/log-out.component';
import { PoliciesComponent } from 'app/core/features/policies/policies.component';


const mainLayoutRoutes: Routes = [

  { path:"dashboard", component:DashboardComponent},
  { path:"individual-conflict", component:IndividualConflictComponent},
  { path:"group-conflict", component:GroupConflictComponent},
  { path:"gifts-received", component:GiftsReceivedComponent},
  { path:"gifts-given-out", component:GiftsGivenOutComponent},
  { path:"policies", component:PoliciesComponent},
  { path:"faqs", component:FaqsComponent},
  { path:"logout", component:LogOutComponent}

];

@NgModule({
  imports: [
    RouterModule.forChild(mainLayoutRoutes),
    
  ],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
