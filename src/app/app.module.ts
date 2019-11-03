import { AccountDetailsResolverService } from './core/resolvers/account-details-resolver.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { AccountResolverService } from './core/resolvers/account-resolver.service';
import { AccountService } from './core/services/account_services/account.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OverviewComponent,
    NewAccountComponent,
    DepositComponent,
    WithdrawComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AccountService, AccountResolverService, AccountDetailsResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
