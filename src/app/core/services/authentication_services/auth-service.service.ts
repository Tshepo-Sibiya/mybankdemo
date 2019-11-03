import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { TokenModel } from '../../shared/models/token.model';
import { LoginModel } from '../../shared/models/login.model';
import { from, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http: HttpClient, private router: Router) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  requestToken(usrname: string, pswd: string): Observable<TokenModel> {
    return this.http
    .post<TokenModel>(
      environment.authUrl,
      { email: usrname, password: pswd, returnSecureToken: true },
      this.httpOptions
    )
    .pipe(
      map((token) => {
        if (token != null) {
          this.storeToken(token);
        }
        return token;
      })
    );
  }

  revokeToken() {
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('ClientDetails');
    sessionStorage.removeItem('DefaultAccount');
    this.router.navigate(['/login']);
  }

  storeToken(token: any): void {
    if (token != null) {
      sessionStorage.setItem('Token', JSON.stringify(token));
      this.router.navigate(['/overview']);
    }
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('Token');
  }
}
