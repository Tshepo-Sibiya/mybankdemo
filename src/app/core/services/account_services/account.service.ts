import { ClientDetailsModel } from './../../shared/models/client.details.model';
import { AccountModel } from './../../shared/models/account.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginModel } from '../../shared/models/login.model';
import { from, Observable } from 'rxjs';
import { TokenModel } from '../../shared/models/token.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  userToken: TokenModel;
  accounts: AccountModel[];
  defaultAccTemp: any;
  constructor(private http: HttpClient, private router: Router) {
    const token = sessionStorage.getItem('Token');
    this.userToken = JSON.parse(token);
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getClientDetails(): Observable<ClientDetailsModel> {
    return this.http
      .get<ClientDetailsModel>(
        environment.clientsEndPoint +
          this.userToken.localId +
          '.json?auth=' +
          this.userToken.idToken
      )
      .pipe(
        map(data => {
          this.storeClientData(data);
          this.getAccountsDetails(data.accounts[1]).subscribe(value => {
            this.defaultAccTemp = value;
            this.storeDefaultAccountDetails(this.defaultAccTemp);
            // sessionStorage.setItem(
            //   'DefaultAccountDetails',
            //   this.defaultAccTemp
            // );
          });
          return data;
        })
      );
  }

  storeClientData(clientDetails: any): void {
    if (clientDetails != null) {
      sessionStorage.removeItem('ClientDetails');
      sessionStorage.setItem('ClientDetails', JSON.stringify(clientDetails));
    }
  }

  storeDefaultAccountDetails(accountDetails: any): void {
    sessionStorage.removeItem('DefaultAccount');
    sessionStorage.setItem('DefaultAccount', JSON.stringify(accountDetails));
  }

  getAccountsDetails(account: string): Observable<AccountModel> {
    return this.http
      .get<AccountModel>(
        environment.accountsEndPoint +
          account +
          '.json?auth=' +
          this.userToken.idToken
      )
      .pipe(
        map(data => {
          if (data != null) {
            // console.log(data);
            // this.accounts.push(data);
          }
          return data;
        })
      );
  }

  depositFunds(bal: number, odraft: number, account: string): Observable<AccountModel>{
    return this.http
      .put<AccountModel>(
        environment.accountsEndPoint +
          account +
          '.json?auth=' +
          this.userToken.idToken,
        { balance: bal, overdraft: odraft }
      )
      .pipe(
        map(data => {
          if (data != null) {
          }
          return data;
        })
      );
  }

  createAccount(bal: number, odraft: number, account: number): Observable<AccountModel>{
    return this.http
      .put<AccountModel>(
        environment.accountsEndPoint +
          account +
          '.json?auth=' +
          this.userToken.idToken,
        { balance: bal, overdraft: odraft }
      )
      .pipe(
        map(data => {
          if (data != null) {
          }
          return data;
        })
      );
  }

  updateClientsAccountList(accounts: string[]) {
    return this.http
      .put<AccountModel>(
        environment.clientsEndPoint +
          this.userToken.localId +
          '.json?auth=' +
          this.userToken.idToken,
        { accounts }
      )
      .pipe(
        map(data => {
          if (data != null) {
          }
          return data;
        })
      );
  }
}
