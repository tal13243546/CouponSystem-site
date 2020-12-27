import { Customer } from 'src/app/models/Customer';
import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  customer= new Customer();

  // token: string;

  id:number;

  constructor(private adminService: AdminServiceService, private router: Router, private activatedRoute: ActivatedRoute)
  {
    this.id = +(this.activatedRoute.snapshot.params.id);
    // this.token = this.activatedRoute.snapshot.params.token;
  }

  ngOnInit(): void {
     if (this.id) {
       this.getOneCustomer(this.id);
     }
  }

  public goTo(): void {
    this.router.navigateByUrl('admin');
  }

  public addCustomer(){
    console.log(this.customer);
    this.adminService.addCustomer(this.customer).subscribe(
      ()=>{this.goTo();},
      (err)=>{alert(err.error); console.log(err);});
  }

  public getOneCustomer(id: number){
    this.adminService.getOneCustomer(id).subscribe(
      (res)=>{this.customer=res},
      (err)=>{console.log(err);});
  }

  public updateCustomer(){
    this.adminService.updateCustomer(this.customer).subscribe(
      ()=>{this.goTo()},
      (err)=>{alert(err.error); console.log(err);});
  }

}
