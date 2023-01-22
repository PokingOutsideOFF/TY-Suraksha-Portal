import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { ClienthealthcareService } from 'src/app/services/clienthealthcare.service';

@Component({
  selector: 'app-postoffice',
  templateUrl: './postoffice.component.html',
  styleUrls: ['./postoffice.component.css']
})
export class PostofficeComponent implements OnInit {
  nfClients: any={};
  fClients: any={};
  editable: boolean = false;
  client: any={};
  passed!: boolean;
  selectedValue !: Number;

  constructor(private clientservice: ClienthealthcareService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.passed = false;
    this.clientservice.getnotfClients().subscribe(res=>{
      this.nfClients = res;
      console.log(this.nfClients);
    })

    this.clientservice.getfClients().subscribe(res => {
      this.fClients = res;
    })
  }

  checkVal(val: any) {
    this.editable = !this.editable;
    if (this.editable){
      if (val == 0) var id1 = document.getElementsByTagName('p')[0].innerHTML;
      else var id1 = document.getElementsByTagName('p')[(val*3)].innerHTML;
      console.log(id1);
      console.log(val);
      var sending = {"id": id1};
      this.clientservice.updateStatusfirst(sending).subscribe(res=>{
        console.log(res);
        if (res == 1){
          this.passed = true;
          this.clientservice.getnotfClients().subscribe(res=>{
            this.nfClients = res;
            console.log(this.nfClients);
          })
          this.clientservice.getfClients().subscribe(res => {
            this.fClients = res;
          })
        }
      })
    }
  }

  // updateStatus(){
  //   var sending = {"id": this.tokenid.controls['uniquetoken'].value}
  //   this.clientservice.updateStatusfirst(sending).subscribe(res=>{
  //     console.log(res);
  //     if (res == 1){
  //       this.passed = true;
  //       this.clientservice.getAllClients().subscribe(res=>{
  //         this.allClients = res;
  //         console.log(this.allClients);
  //       })
  //     }
  //   })
  // }

}
