import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MicrofinanceComponent } from './components/microfinance/microfinance.component';
import { MemberComponent } from './components/member/member.component';
import { LoanComponent } from './components/loan/loan.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MicrofinanceComponent,
    MemberComponent,
    LoanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
