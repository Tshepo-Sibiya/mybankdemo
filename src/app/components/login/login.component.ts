import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../core/services/authentication_services/auth-service.service';
import { LoginModel } from '../../core/shared/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthServiceService
  ) {}
  userLoginData: LoginModel;
  hasError = false;
  requestingToken = false;
  errorMessage: string;
  loginProgressMessage: string;
  loginProgress: number;
  onLogin() {
    this.requestingToken = true;
    this.hasError = false;
    const password = this.loginForm.value.Password;
    const username = this.loginForm.value.Username;
    // if (this.loginForm.get('Password').errors) {
    // }
    this.authService.requestToken(username, password).subscribe(
      data => {
        this.loginProgressMessage = 'Login';
        this.loginProgress = 95;
        this.requestingToken = false;
      },
      error => {
        this.hasError = true;
        this.errorMessage = error.error.error.code;
        this.requestingToken = false;
      }
    );
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      Username: ['', Validators.email],
      Password: [
        '',
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10)
      ]
    });
  }
}
