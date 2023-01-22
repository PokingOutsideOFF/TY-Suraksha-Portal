import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';


import {MatInputModule} from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidatorService } from './services/validator.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SomeSharedService } from './globals';
import { HealthcareComponent } from './components/healthcare/healthcare.component';
import { PostofficeComponent } from './components/postoffice/postoffice.component';
import { InsuranceComponent } from './components/insurance/insurance.component';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    HealthcareComponent,
    PostofficeComponent,
    InsuranceComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    MatSidenavModule, //For sidenav bar
    MatGridListModule, //For grid layout
    MatMenuModule,  //For menus
    MatButtonModule, 
    MatCardModule, //Nice styles around elements
    MatIconModule, //For icons
    MatExpansionModule, //expansion filters on left side bar
    MatListModule, //For left side bar
    MatToolbarModule, //Header
    MatTableModule, //Table on cart page
    MatBadgeModule, //Adding badge inside cart icon to display how many items in cart
    MatSnackBarModule, //Displaying info to user eg adding new product or removing product notify user
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
  ],
  providers: [ValidatorService, SomeSharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
