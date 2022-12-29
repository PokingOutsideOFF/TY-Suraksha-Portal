import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienthealthcareService } from 'src/app/services/clienthealthcare.service';

@Component({
  selector: 'app-healthcare',
  templateUrl: './healthcare.component.html',
  styleUrls: ['./healthcare.component.css']
})
export class HealthcareComponent implements OnInit {
  selectedValue!: number;
  pickedImage!: String;
  formdata = new FormData();
  file!: File;
  returnedinfo: any = {};
  public dataloaded!: boolean;

  constructor(private fb: FormBuilder, private clientservice: ClienthealthcareService) { }

  ngOnInit(): void {
    this.dataloaded = false;
  }

  clientname = this.fb.group({
    name1: ['', Validators.required]
  });

  clientinfo = new FormGroup({
    name2: new FormControl(null, [Validators.required]),
    ///image: new FormControl(null, [Validators.required])
  })

  PickedFile(event: Event){
    this.file = (event.target as HTMLInputElement).files![0];  
    //this.clientinfo.patchValue({image: file});
    //this.clientinfo.get('file1')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.pickedImage = reader.result as String;
    }
    reader.readAsDataURL(this.file);
    //const el = event.currentTarget as HTMLInputElement;
    // this.files = el.files as FileList;
    // console.log(this.files);
  }

  nameSubmit(){
    var name = this.clientname.controls['name1'].value;
    var sendData = {"name": name};
    this.clientservice.getClient(sendData).subscribe(res => {
      console.log(res);
      this.returnedinfo = res[0];
      console.log(this.returnedinfo.name);
      this.dataloaded = true;
    })
    this.clientname.reset();
  }

  newClient(){
    //var name2 = this.clientinfo.controls['name2'].value;
    //const idfile = this.clientinfo.controls['image'].value;
    //const sendData = {"name": name2, "file": idfile};
    // this.clientservice.sendClient(sendData).subscribe(res => {
    //   console.log(res);
    // })
    // this.clientinfo.reset();
    this.clientservice.sendClient(this.clientinfo.value, this.file).subscribe((res: any) => {
      if (res.body){
        console.log("Success.");
      }
    })
    this.clientinfo.reset();
  }
}
