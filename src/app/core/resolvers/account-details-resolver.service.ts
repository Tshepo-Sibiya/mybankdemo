import { Injectable } from '@angular/core';
import { AccountModel } from './../shared/models/account.model';
import { HttpClient } from '@angular/common/http';

import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AccountDetailsResolverService implements Resolve<AccountModel> {
  dt: any;
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AccountModel> {
    this.accountService
      .getAccountsDetails(sessionStorage.getItem('215104062'))
      .subscribe(data => {
        this.dt = data;
      });
    return this.dt;
  }
}
