import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";




import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';


import { MainLayoutComponent } from './core/components/main-layout/main-layout/main-layout.component';
import { LayoutModule } from "./core/components/layout/layout.module";
import { AuthComponent } from './core/components/auth/auth/auth.component';
import { HttpClientModule } from "@angular/common/http";



@NgModule({
  declarations: [
  AppComponent,
  MainLayoutComponent,
  AuthComponent,
  
  
         
    
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{ useHash: true  }),
    LayoutModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
