import { CustomerServiceService } from 'src/app/services/customer-service.service';
import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/Coupon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-coupons',
  templateUrl: './customer-coupons.component.html',
  styleUrls: ['./customer-coupons.component.css']
})
export class CustomerCouponsComponent implements OnInit {

  ownCoupons: Coupon[]= [];

  categoryCoupons: Coupon[] = [];

  priceCoupons: Coupon[] = []

  // token: string;

  maxPrice: number;

  category: string;

  categories = [
    { value: 'ANY', viewValue: 'Any' },
    { value: 'FOOD', viewValue: 'Food' },
    { value: 'ELECTRICITY', viewValue: 'Electricity' },
    { value: 'RESTAURANT', viewValue: 'Restaurant' },
    { value: 'VACATION', viewValue: 'Vacation' }
  ];

  constructor(private customerService: CustomerServiceService, private router: Router, private activatedRoute: ActivatedRoute)
  {
    // this.token = this.activatedRoute.snapshot.params.token;
  }

  ngOnInit(): void {
    this.getCoupons();
  }

  public getCoupons(){
    this.customerService.getCustomerCoupons().subscribe(
    (res)=>{this.ownCoupons= res; this.categoryCoupons = res; this.priceCoupons = res},
    (err)=>{console.log(err);});
  }

  public goToCustomer(): void {
    this.router.navigateByUrl('customer');
  }

  public filterCategory(){
    if (this.category && this.category !== 'ANY') {
      this.customerService.getCustomerCouponsByCategory(this.category).subscribe(
      (res)=>{this.categoryCoupons= res;console.log(this.categoryCoupons); this.filterCoupons()},
      (err)=>{console.log(err);});
    }else{
      this.customerService.getCustomerCoupons().subscribe(
        (res)=>{this.categoryCoupons= res; console.log(this.categoryCoupons); this.filterCoupons()},
        (err)=>{console.log(err);})
    }
  }

  public filterPrice(){
    if (this.maxPrice) {
      this.customerService.getCustomerCouponsByPrice(this.maxPrice).subscribe(
      (res)=>{this.priceCoupons= res; console.log(this.priceCoupons); this.filterCoupons()},
      (err)=>{console.log(err);});
    }else{
      this.customerService.getCustomerCoupons().subscribe(
        (res)=>{this.priceCoupons= res; console.log(this.priceCoupons); this.filterCoupons()},
        (err)=>{console.log(err);})
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
        this.ownCoupons = filteredCoupons;
    }

}
