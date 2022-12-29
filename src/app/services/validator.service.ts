import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})

export class ValidatorService {
  private baseURL = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  // public getAllUsers(): Observable<User[]>{
  //   return this.httpClient.get<User[]>(this.baseURL);
  // }

  public getUser(user:any): Observable<any>{
    return this.httpClient.post<any>(this.baseURL, user);
  }

}
