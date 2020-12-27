import { AdminServiceService } from './../../services/admin-service.service';
import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/Company';
import { Customer } from 'src/app/models/Customer';
import { Router } from '@angular/router';
import { TokensManagerService } from 'src/app/services/tokens-manager.service';
import { LoginResponse } from 'src/app/models/LoginResponse';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  companies: Company[] = [];

  customers: Customer[] = [];

  loginResponse = new LoginResponse();

  constructor(private adminService: AdminServiceService, private tokensManager: TokensManagerService, private router: Router)
  {

  }

  ngOnInit(): void {
    this.loginResponse = this.tokensManager.getLoginResponse();
    if (this.loginResponse.token && this.loginResponse.type === 'admin') {
      this.getAllCompanies();
      this.getAllCustomers();
    }
  }

  public goToCompanyForm(type: string, id?: number): void {
    if (type === 'add') {
      // alert('open add form with token: ' + this.token);
      this.router.navigateByUrl('companyForm/' + this.loginResponse.token);
    }else if (type === 'update'){
      // alert('open update form with id: ' + id);
      this.router.navigateByUrl('companyForm/update/' + id + '/' + this.loginResponse.token);
    }
  }

  public goToCustomerForm(type: string, id?: number): void {
    if (type === 'add') {
      // alert('open add form with token: ' + this.token);
      this.router.navigateByUrl('customerForm/' + this.loginResponse.token);
    }else if (type === 'update'){
      // alert('open update form with id: ' + id);
      this.router.navigateByUrl('customerForm/update/' + id + '/' + this.loginResponse.token);
    }
  }

  public getAllCompanies(){
    this.adminService.getAllCompanies().subscribe(
      (res)=>{
        if (res) {
        this.companies= res
        }
      },
      (err)=>{console.log(err.message);});
  }

  public deleteCompany(id: number){
    this.adminService.deleteCompany(id).subscribe(
      (res)=>{console.log(res); this.getAllCompanies();},
      (err)=>{console.log(err.message);});
  }

  public getAllCustomers(){
    this.adminService.getAllCustomers().subscribe(
      (res)=>{
        if (res) {
          this.customers= res
        }
      },
      (err)=>{console.log(err.message);});
  }

  public deleteCustomer(id: number){
    this.adminService.deleteCustomer(id).subscribe(
      (res)=>{console.log(res); this.getAllCustomers();},
      (err)=>{console.log(err.message);});
  }

}
