import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { ValidatorService } from 'src/app/services/validator.service';
import { User } from 'src/app/models/User';
import { SomeSharedService } from 'src/app/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  //private formSubmitAttempt: boolean;
  private result: Number | undefined;
  user!: User;
  sendData: any;
  //formData: any = new FormData();
  access: any;

  constructor(private fb: FormBuilder, private router: Router, private validatorService: ValidatorService, private sharedService: SomeSharedService) { 
  }
  
  loginInfo = this.fb.group({
    userID: ['', Validators.required],
    access: ['', Validators.required],
    password: ['', Validators.required],
    insuranceco: [''],
  });

  ngOnInit(): void {
  }

  selected(change: MatSelectChange){
    this.access = change.value;
    console.log(this.access);
  }

  onSubmit(){
    var data1 = this.loginInfo.controls['userID'].value;
    var data2 = this.loginInfo.controls['password'].value;
    var data4 = this.loginInfo.controls['insuranceco'].value;
    var temp = this.loginInfo.controls['access'].value;
    if (temp == "one") var data3 = 1;
    else if (temp == "two") var data3 = 2;
    else var data3 = 3;
    this.sharedService.globalVar = data3.toString();
    console.log(this.sharedService.globalVar);
    if (data3 != 3) this.sendData = {"username": data1, "access": data3, "password": data2};
    else this.sendData = {"username": data1, "access": data3, "password": data2, "insuranceco": data4};
    this.validatorService.getUser(this.sendData).subscribe(res => {
      this.result = res;
      console.log("Result" + this.result);
      if (this.result == 0){
        this.router.navigate(['/']);
        this.loginInfo.reset();
      }
      else{
        console.log("Success.");
        this.router.navigate(['/home']);
        this.sharedService.insuranceco = data4?.toString();
      }
    })
  }
}
