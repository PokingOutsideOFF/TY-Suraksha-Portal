import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClienthealthcareService } from 'src/app/services/clienthealthcare.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {
  selectedValue!: Number;
  value!: Number;
  fClients: any = {};
  aClients: any = {};
  rClients: any = {};


  constructor(private clientservice: ClienthealthcareService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.clientservice.getfClients().subscribe(res => {
      this.fClients = res;
    })
    this.clientservice.sendAccepted().subscribe(res1=>{
      this.aClients = res1;
    })
    this.clientservice.sendRejected().subscribe(res2 => {
      this.rClients = res2;
    })
  }

  statusUpdate = this.fb.group({
    token: ['', Validators.required],
    status: ['', Validators.required],
    rAdvice: ['', Validators.required],
  })

  changeStatus(){
    // var id1 = this.statusUpdate.controls['token'].value;
    // var stat = this.statusUpdate.controls['status'].value;
    // var rA = this.statusUpdate.controls['rAdvice'].value;
    // if (this.value == 0) var sending = {"id": id1, "status": "Accepted", "RA": rA};
    // else var sending = {"id": id1, "status": "Rejected", "RA": rA};
    //var sending = {"id": id1, "status": stat, "RA": rA};
    this.clientservice.sendStatus(this.statusUpdate.value).subscribe(res => {
      console.log(res);
      if (res == 1){
        this.clientservice.getfClients().subscribe(res => {
          this.fClients = res;
        })
        this.clientservice.sendAccepted().subscribe(res1=>{
          this.aClients = res1;
        })
        this.clientservice.sendRejected().subscribe(res2 => {
          this.rClients = res2;
        })
      }
    })
  }
}
