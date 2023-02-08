import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SomeSharedService } from 'src/app/globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  imageSrc = 'assets/images/portal-icon.png'  
  imageAlt = 'iPhone'

  constructor(private router: Router, public sharedService: SomeSharedService) { }

  ngOnInit(): void {
    console.log(this.sharedService.globalVar);
  }

  onLogging(): void{
    fetch('/logout', {method: 'GET'})
        .then(response => response.text)
        .then(text => console.log(text))
    this.router.navigate(['/'], {replaceUrl: true});
  }

}