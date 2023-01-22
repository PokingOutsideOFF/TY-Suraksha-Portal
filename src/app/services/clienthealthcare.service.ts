import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienthealthcareService {
  private URL1 = "http://localhost:3000/healthcaredisplay";
  private URL2 = "http://localhost:3000/healthcarenew";
  private URL3 = "http://localhost:3000/displaynotforwarded";
  private URL4 = "http://localhost:3000/updateone";
  private URL5 = "http://localhost:3000/displayforwarded";
  private URL6 = "http://localhost:3000/updateinsurance";
  private URL7 = "http://localhost:3000/accepted";
  private URL8 = "http://localhost:3000/rejected";
  formdata = new FormData;
  formdata1 = new FormData;

  constructor(private httpClient: HttpClient) { }

  public getClient(clientname: any): Observable<any>{
    return this.httpClient.post<any>(this.URL1, clientname);
  }

  public getnotfClients(): Observable<any>{
    return this.httpClient.get<any>(this.URL3);
  }

  public sendClient(clientinfo: any, file: File): Observable<any>{
    this.formdata.append("name", clientinfo.name2);
    this.formdata.append("Identity-file", file);
    this.formdata.append("Insurance_company", clientinfo.insuranceconame);
    this.formdata.append("filepath", "");
    return this.httpClient.post<any>(this.URL2, this.formdata);
  }

  public updateStatusfirst(token: any): Observable<any>{
    return this.httpClient.post<any>(this.URL4, token);
  }

  public getfClients(): Observable<any> {
    return this.httpClient.get<any>(this.URL5);
  }

  public sendStatus(updateInfo: any): Observable<any>{
    this.formdata1.append("id", updateInfo.token);
    this.formdata1.append("status", updateInfo.status);
    this.formdata1.append("RA", updateInfo.rAdvice);
    var sending = {"id": updateInfo.token, "status": updateInfo.status, "RA": updateInfo.rAdvice};
    // if (id.status == 0){
    //   this.formdata1.append("status", "Accepted");
    // }
    // else{
    //   this.formdata1.append("status", "Rejected");
    //   this.formdata1.append("RA", id.RA);
    // }
    return this.httpClient.post<any>(this.URL6, sending);
  }

  public sendAccepted(): Observable<any>{
    return this.httpClient.get(this.URL7);
  }

  public sendRejected(): Observable<any>{
    return this.httpClient.get(this.URL8);
  }
}
