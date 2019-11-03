import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthServiceService} from '../services/authentication_services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      return false;
      this.router.navigate(['/login']);
    }
  }
}
