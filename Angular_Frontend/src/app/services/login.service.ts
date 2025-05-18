import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  logIn(res : any){
    return this.http.post(environment.baseUrl + "api/signIn", res)
  }
  StaffSignIn(res : any){
    return this.http.post(environment.baseUrl + "api/staffSignIn", res)
  }
}
