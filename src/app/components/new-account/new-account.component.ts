import { ClientDetailsModel } from './../../core/shared/models/client.details.model';
import { AccountModel } from './../../core/shared/models/account.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './../../core/services/account_services/account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit {

  accountNumber: number;
  success = false;
  newBalance: number;
  loading = false;
  clientAccountList: string[];
  AccountDetails: AccountModel;
  newAccountForm: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private accountService: AccountService) { }

  onSubmit() {
    this.loading = true;
    this.accountNumber = Math.floor(Math.random() * 1000000000);
    this.success = false;
    this.newBalance = this.newAccountForm.value.newBalance;
    this.accountService.createAccount(this.newBalance, 0, this.accountNumber).subscribe((data) => {
      this.clientAccountList.push(this.accountNumber.toString());
      this.accountService.updateClientsAccountList(this.clientAccountList).subscribe((updatedAccounts) => {
        console.log(updatedAccounts);
        this.loading = false;
        this.success = true;

        this.getAccountData();
      });
      this.AccountDetails = data;
      if (data === null) {
        this.AccountDetails = {
          balance: 0,
          overdraft: 0
        };
      }

    });
    this.newAccountForm.value.depositAmount = 0;
  }

  ngOnInit() {
    const tempAccounts: ClientDetailsModel = JSON.parse(sessionStorage.getItem('ClientDetails'));
    this.clientAccountList = tempAccounts.accounts;



    this.newAccountForm = this.fb.group({
      newBalance: 0,
      account: ''
    });
  }

  getAccountData() {
    this.accountService.getAccountsDetails(this.accountNumber.toString()).subscribe((data) => {
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
