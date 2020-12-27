import { LoginResponse } from './../models/LoginResponse';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokensManagerService {
  loginResponse: LoginResponse = new LoginResponse();

  constructor() { }

  public setLoginResponse(response: LoginResponse){
    this.loginResponse = response;
  }

  public getLoginResponse(): LoginResponse{
    return this.loginResponse;
  }

  public deleteLoginResponse(){
    this.loginResponse = new LoginResponse();
  }
}
