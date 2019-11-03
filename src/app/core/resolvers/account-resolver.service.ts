import { Injectable } from '@angular/core';
import { ClientDetailsModel } from './../shared/models/client.details.model';
import { HttpClient } from '@angular/common/http';

import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account_services/account.service';

@Injectable()
export class AccountResolverService implements Resolve<ClientDetailsModel> {
  dt: any;
  accountDetails: any;
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ClientDetailsModel> {
    this.accountService.getClientDetails().subscribe(data => {
      this.dt = data;
      // console.log(data);
      this.accountService.getAccountsDetails(data.accounts[0]).subscribe((value) => {
        this.accountDetails = value;
        sessionStorage.removeItem('DefaultAccount');
        sessionStorage.setItem('DefaultAccount', JSON.stringify(this.accountDetails));
      });
    });
    return this.dt;
  }
}
