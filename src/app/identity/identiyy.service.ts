import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../shared/Models/ResetPassowrd';
import { ActiveAccount } from '../shared/Models/ActiveAccount';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
baseURL= 'https://localhost:44335/api/'

  constructor(private http:HttpClient) { }
  register(form:any){
    return this.http.post(this.baseURL+"Account/Register",form)
  }
  active(param:ActiveAccount){
    return this.http.post(this.baseURL+"Account/active-account",param)
  }
  Login(form:any){
    return this.http.post(this.baseURL+"Account/Login",form)
  }
  forgetPassword(email:string){
    return this.http.get(this.baseURL+`Account/send-email-forget-password?email=${email}`)
  }
  ResetPassword(param:ResetPassword){
   return this.http.post(this.baseURL+"Account/reset-password",param)
  }
}
