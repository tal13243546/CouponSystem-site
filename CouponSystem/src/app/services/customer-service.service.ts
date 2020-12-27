import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from '../models/Coupon';
import { Customer } from '../models/Customer';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  private BASE_URL = 'http://localhost:8080/customer/';

  constructor(private httpClient: HttpClient) { }

  public customerLogin(email: string, password: string): Observable<LoginResponse>{
    const options = { withCredentials: true };
    return this.httpClient.post<LoginResponse>(this.BASE_URL + 'login/' + email + "/" + password, options);
  }

  public customerLogout(): Observable<any>{
    const options = { withCredentials: false};
    return this.httpClient.delete<any>(this.BASE_URL + 'logout', options);
  }

  public purchaseCoupon(coupon: Coupon): Observable<any> {
    const coupon2 = {
      id: coupon.id,
      companyId: coupon.companyId,
      category: coupon.category,
      title: coupon.title,
      description: coupon.description,
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      amount: coupon.amount,
      price: coupon.price,
      image: coupon.image
    }
    const options = { withCredentials: false };
    return this.httpClient.post<any>(this.BASE_URL + "purchase", coupon2, options);
  }

  public getCustomerDetails(): Observable<Customer>{
    const options = { withCredentials: false };
    return this.httpClient.get<Customer>(this.BASE_URL + "getDetails", options)
  }

  public getCustomerCoupons(): Observable<Coupon[]>{
    const options = { withCredentials: false };
    return this.httpClient.get<Coupon[]>(this.BASE_URL + "getCoupons", options)
  }

  public getCustomerCouponsByCategory(category: string): Observable<Coupon[]>{
    const options = { withCredentials: false };
    return this.httpClient.get<Coupon[]>(this.BASE_URL + 'getCouponsByCategory/' + category, options);
  }

  public getCustomerCouponsByPrice(maxPrice: number): Observable<Coupon[]>{
    const options = { withCredentials: false };
    return this.httpClient.get<Coupon[]>(this.BASE_URL + 'getCouponsByPrice/' + maxPrice, options);
  }

  public getAllCoupons(): Observable<Coupon[]>{
    const options = { withCredentials: false };
    return this.httpClient.get<Coupon[]>(this.BASE_URL + 'getAllCoupons', options);
  }

  public getAllCouponsByCategory(category: string): Observable<Coupon[]>{
    const options = { withCredentials: false };
    return this.httpClient.get<Coupon[]>(this.BASE_URL + 'getAllCouponsByCategory/' + category, options);
  }

  public getAllCouponsByPrice(maxPrice: number): Observable<Coupon[]>{
    const options = { withCredentials: false };
    return this.httpClient.get<Coupon[]>(this.BASE_URL + 'getAllCouponsByPrice/' + maxPrice, options);
  }

}
