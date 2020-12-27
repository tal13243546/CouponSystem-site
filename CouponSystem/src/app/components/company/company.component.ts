import { CompanyServiceService } from './../../services/company-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/Company';
import { Coupon } from 'src/app/models/Coupon';
import { TokensManagerService } from 'src/app/services/tokens-manager.service';
import { LoginResponse } from 'src/app/models/LoginResponse';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  ownCoupons: Coupon[] = [];

  categoryCoupons: Coupon[] = [];

  priceCoupons: Coupon[] = [];

  company: Company = new Company();

  loginResponse = new LoginResponse();

  maxPrice: number;

  category: string;

  categories = [
    { value: 'ANY', viewValue: 'Any' },
    { value: 'FOOD', viewValue: 'Food' },
    { value: 'ELECTRICITY', viewValue: 'Electricity' },
    { value: 'RESTAURANT', viewValue: 'Restaurant' },
    { value: 'VACATION', viewValue: 'Vacation' }
  ];

  constructor(private companyService: CompanyServiceService, private tokensManager: TokensManagerService, private router: Router) {}

  ngOnInit(): void {
    this.loginResponse = this.tokensManager.getLoginResponse();
    if (this.loginResponse.token && this.loginResponse.type === 'company') {
      this.getCompanyCoupons();
      this.getCompanyDetails();
    }
  }

  public getCompanyDetails() {
    this.companyService.getDetails().subscribe(
      (res) => { this.company = res },
      (err) => { console.log(err); })
  }

  public getCompanyCoupons() {
    this.companyService.getCompanyCoupons().subscribe(
      (res) => { this.ownCoupons = res; this.categoryCoupons = res; this.priceCoupons = res },
      (err) => { console.log(err.message) });
  }

  public goToCouponForm(type: string, coupon?: Coupon): void {
    if (type === 'add') {
      // alert('open add form with token: ' + this.token);
      console.log(this.company.id);
      this.router.navigateByUrl('couponForm/' + this.company.id + '/' + this.loginResponse.token);
    } else if (type === 'update') {
      // alert('open update form');
      // this.companyService.setCoupon(coupon);
      this.router.navigateByUrl('couponForm/update/' + coupon.title + '/' + coupon.companyId + '/' + this.loginResponse.token);
    }
  }

  public deleteCoupon(id: number) {
    this.companyService.deleteCoupon(id).subscribe(
      (res) => { console.log(res); this.getCompanyCoupons(); },
      (err) => { console.log(err.message); });
  }

  public filterCategory() {
    if (this.category && this.category !== 'ANY') {
      this.companyService.getCompanyCouponsByCategory(this.category).subscribe(
        (res) => { this.categoryCoupons = res; console.log(this.categoryCoupons); this.filterCoupons() },
        (err) => { console.log(err); });
    } else {
      this.companyService.getCompanyCoupons().subscribe(
        (res) => { this.categoryCoupons = res; console.log(this.categoryCoupons); this.filterCoupons() },
        (err) => { console.log(err); })
    }
  }

  public filterPrice() {
    if (this.maxPrice) {
      this.companyService.getCompanyCouponsByPrice(this.maxPrice).subscribe(
        (res) => { this.priceCoupons = res; console.log(this.priceCoupons); this.filterCoupons() },
        (err) => { console.log(err); });
    } else {
      this.companyService.getCompanyCoupons().subscribe(
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
    this.ownCoupons = filteredCoupons;
  }
}




