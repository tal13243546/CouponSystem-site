import { CompanyServiceService } from './../../services/company-service.service';
import { Coupon } from 'src/app/models/Coupon';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-coupon-form',
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.css']
})
export class CouponFormComponent implements OnInit {

  coupon= new Coupon();

  // token: string;

  title:string;

  companyId: number;

  categories = [
    {value: 'FOOD', viewValue: 'Food'},
    {value: 'ELECTRICITY', viewValue: 'Electricity'},
    {value: 'RESTAURANT', viewValue: 'Restaurant'},
    {value: 'VACATION', viewValue: 'Vacation'}
  ];

  constructor(private companyService: CompanyServiceService, private router: Router, private activatedRoute: ActivatedRoute)
  {
    this.companyId = +(this.activatedRoute.snapshot.params.companyId);
    this.coupon.companyId = this.companyId;
    this.title = this.activatedRoute.snapshot.params.title;
    // this.token = this.activatedRoute.snapshot.params.token;
  }

  ngOnInit(): void {
    if (this.companyId && this.title) {
    this.getOneCoupon();
    }
  }

  public goTo(): void {
    this.router.navigateByUrl('company');
  }

  public addCoupon(){
    console.log(this.coupon);
    this.companyService.addCoupon(this.coupon).subscribe(
      ()=>{this.goTo();},
      (err)=>{alert(err.error); console.log(err);});
  }

  public getOneCoupon(){
      this.companyService.getOneCoupon(this.title, this.companyId).subscribe(
      (res)=>{this.coupon = res},
      (err)=>{console.log(err);});
  }

  public updateCoupon(){
    this.companyService.updateCoupon(this.coupon).subscribe(
      ()=>{this.goTo();},
      (err)=>{alert(err.error); console.log(err);});
  }


}
