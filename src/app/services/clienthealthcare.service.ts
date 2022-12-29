import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienthealthcareService {
  private URL1 = "http://localhost:3000/healthcaredisplay";
  private URL2 = "http://localhost:3000/healthcarenew";
  formdata = new FormData;

  constructor(private httpClient: HttpClient) { }

  public getClient(clientname: any): Observable<any>{
    return this.httpClient.post<any>(this.URL1, clientname);
  }

  public sendClient(clientinfo: any, file: File): Observable<any>{
    this.formdata.append("name", clientinfo.name2);
    this.formdata.append("Identity-file", file);
    this.formdata.append("filepath", "");
    return this.httpClient.post<any>(this.URL2, this.formdata);
  }
}
