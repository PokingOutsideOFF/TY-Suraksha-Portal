import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthcareComponent } from './components/healthcare/healthcare.component';
import { HomeComponent } from './components/home/home.component';
import { InsuranceComponent } from './components/insurance/insurance.component';
import { LoginComponent } from './components/login/login.component';
import { PostofficeComponent } from './components/postoffice/postoffice.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'logout',
    redirectTo: ''
  },
  {
    path: 'healthcare',
    component: HealthcareComponent
  },
  {
    path: 'postoffice',
    component: PostofficeComponent
  },
  {
    path: 'insurance',
    component: InsuranceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
