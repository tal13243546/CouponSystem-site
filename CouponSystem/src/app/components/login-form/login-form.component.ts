import { CompanyServiceService } from './../../services/company-service.service';
import { LoginDetails } from './../../models/LoginDetails';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Component, OnInit } from '@angular/core';
import { LoginResponse } from 'src/app/models/LoginResponse';
import { Router } from '@angular/router';
import { CustomerServiceService } from 'src/app/services/customer-service.service';
import { TokensManagerService } from 'src/app/services/tokens-manager.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginDetails= new LoginDetails();
  loginResponse = new LoginResponse();
  types = [
    {value: 'admin', viewValue: 'Admin'},
    {value: 'company', viewValue: 'Company'},
    {value: 'customer', viewValue: 'Customer'}
  ];

  constructor(private adminService: AdminServiceService, private companyService: CompanyServiceService, private customerService: CustomerServiceService, private tokensManager: TokensManagerService, private router: Router) { }

  ngOnInit(): void {
  }

  public login(){
    if (this.loginDetails.type === "admin") {
      this.adminService.adminLogin(this.loginDetails.email, this.loginDetails.password).subscribe(
        (res)=>{this.loginResponse= res;
          this.loginResponse.type=this.loginDetails.type;
          this.tokensManager.setLoginResponse(this.loginResponse);
          this.goTo(this.loginDetails.type)},
        (err)=>{alert(err.error); console.log(err);});
    } else if (this.loginDetails.type === "company") {
      this.companyService.companyLogin(this.loginDetails.email, this.loginDetails.password).subscribe(
        (res)=>{this.loginResponse= res;
          this.loginResponse.type=this.loginDetails.type;
          this.tokensManager.setLoginResponse(this.loginResponse);
          this.goTo(this.loginDetails.type)},
        (err)=>{alert(err.error); console.log(err);});
    }else if (this.loginDetails.type === "customer") {
      this.customerService.customerLogin(this.loginDetails.email, this.loginDetails.password).subscribe(
        (res)=>{this.loginResponse= res;
          this.loginResponse.type=this.loginDetails.type;
          this.tokensManager.setLoginResponse(this.loginResponse);
          this.goTo(this.loginDetails.type)},
        (err)=>{alert(err.error); console.log(err);});
    }
  }

  public goTo(type: string): void {
    this.router.navigateByUrl(type); // + '/' + this.loginResponse.token);
  }

}
