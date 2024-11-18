import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  private loginUrl = 'http://localhost:8080/admin/login';

  

  login(username: string, password: string): Observable<any> {
    const loginData={username,password};
     
    return this.http.post(`${this.loginUrl}`,loginData ,{responseType:'text'});
  }
}
