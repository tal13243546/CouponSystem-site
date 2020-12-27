import { TokensManagerService } from './../../services/tokens-manager.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { CompanyServiceService } from 'src/app/services/company-service.service';
import { CustomerServiceService } from 'src/app/services/customer-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(private tokensManager: TokensManagerService, private router: Router, private adminService: AdminServiceService, private companyService: CompanyServiceService, private customerService: CustomerServiceService) { }

  ngOnInit(): void {
  }

  public logout(){
    const loginResponse = this.tokensManager.getLoginResponse();
    if (loginResponse.type === 'admin') {
      console.log('admin');
      console.log(loginResponse.type + " " + loginResponse.token);
      this.adminService.adminLogout().subscribe(()=>{console.log('logout successfully');}, (err)=>{console.log(err);});
    }else if (loginResponse.type === 'company'){
      console.log('company');
      console.log(loginResponse.type + " " + loginResponse.token);
      this.companyService.companyLogout().subscribe(()=>{console.log('logout successfully');}, (err)=>{console.log(err);});
    }else{
      console.log('customer');
      console.log(loginResponse.type + " " + loginResponse.token);
      this.customerService.customerLogout().subscribe(()=>{console.log('logout successfully');}, (err)=>{console.log(err);});
    }
    this.tokensManager.deleteLoginResponse();
    this.router.navigateByUrl('');
  }

  public checkLogin(): boolean{
    if (this.tokensManager.getLoginResponse().token) {
      return true;
    }
    return false;
  }

}
