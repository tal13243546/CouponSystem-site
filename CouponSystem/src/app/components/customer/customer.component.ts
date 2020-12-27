import { CustomerServiceService } from './../../services/customer-service.service';
import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/Coupon';
import { Customer } from 'src/app/models/Customer';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/LoginResponse';
import { TokensManagerService } from 'src/app/services/tokens-manager.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  allCoupons: Coupon[] = [];

  categoryCoupons: Coupon[] = [];

  priceCoupons: Coupon[] = [];

  customer= new Customer();

  loginResponse = new LoginResponse();

  maxPrice: number;

  category: string;

  categories = [
    { value: 'ANY', viewValue: 'Any' },
    {value: 'FOOD', viewValue: 'Food'},
    {value: 'ELECTRICITY', viewValue: 'Electricity'},
    {value: 'RESTAURANT', viewValue: 'Restaurant'},
    {value: 'VACATION', viewValue: 'Vacation'}
  ];

  constructor(private customerService: CustomerServiceService, private tokensManager: TokensManagerService, private router: Router) {}

  ngOnInit(): void {
    this.loginResponse = this.tokensManager.getLoginResponse();
    if (this.loginResponse.token && this.loginResponse.type === 'customer') {
      this.getAllCoupons();
      this.getCustomerDetails();
    }
  }

  public goToCustomerCoupons(): void {
    this.router.navigateByUrl('customerCoupons/' + this.loginResponse.token);
  }

  public getAllCoupons(){
    this.customerService.getAllCoupons().subscribe(
      (res)=>{this.allCoupons = res; this.categoryCoupons = res; this.priceCoupons = res;},
      (err)=>{console.log(err)});
  }

  public getCustomerDetails(){
    this.customerService.getCustomerDetails().subscribe(
      (res)=>{this.customer= res},
      ()=>{})
  }

  public purchaseCoupon(coupon: Coupon){
    if (confirm("Sure you want to buy this coupon?")) {
       this.customerService.purchaseCoupon(coupon).subscribe(
        ()=>{alert('Congrats you bought a coupon')},
        (err)=>{alert(err.error); console.log(err);})
    } else {
      alert('Ok, You can check other coupons')
    }
  }

  public filterCategory() {
    if (this.category && this.category !== 'ANY') {
      this.customerService.getAllCouponsByCategory(this.category).subscribe(
        (res) => { this.categoryCoupons = res; console.log(this.categoryCoupons); this.filterCoupons() },
        (err) => { console.log(err); });
    } else {
      this.customerService.getAllCoupons().subscribe(
        (res) => { this.categoryCoupons = res; console.log(this.categoryCoupons); this.filterCoupons() },
        (err) => { console.log(err); })
    }
  }

  public filterPrice() {
    if (this.maxPrice) {
      this.customerService.getAllCouponsByPrice(this.maxPrice).subscribe(
        (res) => { this.priceCoupons = res; console.log(this.priceCoupons); this.filterCoupons() },
        (err) => { console.log(err); });
    } else {
      this.customerService.getAllCoupons().subscribe(
        (res) => { this.priceCoupons = res; console.log(this.priceCoupons); this.filterCoupons() },
        (err) => { console.log(err); })
    }
  }

  public filterCoupons(): void {

    let filteredCoupons: Coupon[] = [];

    this.priceCoupons.forEach(coupon => {
      this.categoryCoupons.forEach(coupon2 => {
        if (coupon.id === coupon2.id) {
          filteredCoupons.push(coupon);
          return;
        }
      });
    });
    this.allCoupons = filteredCoupons;
  }
}


