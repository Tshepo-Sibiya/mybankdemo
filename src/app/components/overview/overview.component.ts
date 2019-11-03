import { browser } from 'protractor';
import { AccountModel } from './../../core/shared/models/account.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClientDetailsModel } from '../../core/shared/models/client.details.model';
import { AccountService } from '../../core/services/account_services/account.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../../core/services/authentication_services/auth-service.service';
import { Router } from '@angular/router';

import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  clientData: ClientDetailsModel;
  AccountDetails: AccountModel;
  username: string;
  temptData: AccountModel;
  selectedAccount: string;
  fetchingAccountDetails = false;
  accountSelected = false;
  windLoc: any;
  isDeposit = false;
  isWithdrawal = false;
  dat: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private authService: AuthServiceService
  ) {}

  logout() {
    this.authService.revokeToken();
  }

  displayAccountDetails(account: string) {
    this.fetchingAccountDetails = true;
    this.accountService.getAccountsDetails(account).subscribe((data) => {
      this.fetchingAccountDetails = false;
      this.accountSelected = true;
      console.log(data);
      this.AccountDetails = data;
      // if(this.AccountDetails.balance < 0) {
      //   this.AccountDetails.balance = 0;
      // }
      if (data === null) {
        this.AccountDetails = {
          balance: 0,
          overdraft: 0
        };
      }
    });
  }

  refresh() {
    window.location.reload();
  }

  deposit() {
    // this.isDeposit = !this.isDeposit;
    this.router.navigate(['/deposit', this.selectedAccount]);
  }

  withdraw() {
    // this.isWithdrawal = !this.isWithdrawal;
    this.router.navigate(['/withdraw', this.selectedAccount]);
  }

  ngOnInit() {

    this.clientData = this.route.snapshot.data.response;
    if (this.clientData == null) {
      this.clientData = JSON.parse(sessionStorage.getItem('ClientDetails'));
    }
    console.log(this.clientData.accounts);


  }
}
