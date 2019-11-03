import { NewAccountComponent } from './components/new-account/new-account.component';
import { AccountDetailsResolverService } from './core/resolvers/account-details-resolver.service';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { OverviewComponent } from './components/overview/overview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { PagenotfoundComponent } from '../app/components/pagenotfound/pagenotfound.component';
import { AuthGuardGuard } from './core/guards/auth-guard.guard';
import { AccountResolverService } from './core/resolvers/account-resolver.service';
import { AccountService } from './core/services/account_services/account.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'overview',
    component: OverviewComponent,
    canActivate: [AuthGuardGuard],
    resolve: {
      response: AccountResolverService,
    }
  },
  {
    path: 'deposit/:account',
    component: DepositComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'withdraw/:account',
    component: WithdrawComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'newaccount',
    component: NewAccountComponent,
    canActivate: [AuthGuardGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: '*', component: LoginComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
