import { AccountModel } from './../../core/shared/models/account.model';
import { AccountService } from './../../core/services/account_services/account.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  accountNumber: string;
  depositForm: FormGroup;
  success = false;
  loading = false;
  newBalance: number;
  depositAmount: number;
  AccountDetails: AccountModel;
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private accountService: AccountService) { }
  cancel() {
    this.router.navigate(['/overview']);
  }

  onSubmit() {
    this.success = false;
    this.loading = true;
    this.newBalance = parseFloat(this.AccountDetails.balance.toString()) + parseFloat(this.depositForm.value.depositAmount);
    this.depositAmount = this.depositForm.value.depositAmount;
    this.accountService.depositFunds(this.newBalance, this.AccountDetails.overdraft, this.accountNumber).subscribe((data) => {
      console.log(data);
      this.success = true;
      this.loading = false;
      this.getAccountData();
      this.AccountDetails = data;
      if (data === null) {
        this.AccountDetails = {
          balance: 0,
          overdraft: 0
        };
      }
    });
    this.depositForm.value.depositAmount = 0;
  }



  ngOnInit() {
    this.route.params.subscribe( params => {
      this.accountNumber = params.account;
      console.log(params);
    } );
    this.getAccountData();
    this.depositForm = this.fb.group({
      account: [''],
      depositAmount: [0],
      balance: ''
    });
  }

  getAccountData() {
    this.accountService.getAccountsDetails(this.accountNumber).subscribe((data) => {
      console.log(data);
      this.AccountDetails = data;
      if (data === null) {
        this.AccountDetails = {
          balance: 0,
          overdraft: 0
        };
      }
    });
  }

}
