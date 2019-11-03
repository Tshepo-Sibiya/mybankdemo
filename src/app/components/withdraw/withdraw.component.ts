import { AccountModel } from './../../core/shared/models/account.model';
import { AccountService } from './../../core/services/account_services/account.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  accountNumber: string;
  withdrawalForm: FormGroup;
  success = false;
  loading = false;
  newBalance: number;
  withdrawalAmount: number;
  AccountDetails: AccountModel;
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private accountService: AccountService) { }
  cancel() {
    this.router.navigate(['/overview']);
  }

  onSubmit() {
    this.success = false;
    this.loading = true;
    this.newBalance = parseFloat(this.AccountDetails.balance.toString()) - parseFloat(this.withdrawalForm.value.withdrawalAmount);
    this.withdrawalAmount = this.withdrawalForm.value.withdrawalAmount;
    if (this.AccountDetails.overdraft <= 0) {
      this.AccountDetails.overdraft = this.AccountDetails.overdraft - this.withdrawalForm.value.withdrawalAmount;
    }
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
    this.withdrawalForm.value.depositAmount = 0;
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.accountNumber = params.account;
      console.log(params);
    } );
    this.getAccountData();
    this.withdrawalForm = this.fb.group({
      account: '',
      withdrawalAmount: 0,
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
