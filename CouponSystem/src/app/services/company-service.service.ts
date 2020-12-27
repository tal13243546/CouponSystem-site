import { Coupon } from './../models/Coupon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/LoginResponse';
import { Company } from '../models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {
  private BASE_URL = 'http://localhost:8080/company/';

  constructor(private httpClient: HttpClient) { }

  public companyLogin(email: string, password: string): Observable<LoginResponse>{
    const options = { withCredentials: true };
    return this.httpClient.post<LoginResponse>(this.BASE_URL + 'login/' + email + "/" + password, options);
  }

  public companyLogout(): Observable<any>{
    const options = { withCredentials: false};
    return this.httpClient.delete<any>(this.BASE_URL + 'logout', options);
  }

  public addCoupon(coupon: Coupon): Observable<any> {
    const coupon2 = {
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
    return this.httpClient.post<any>(this.BASE_URL + "addCoupon", coupon2, options);
  }

  public deleteCoupon(id: number): Observable<any>{
    const options = { withCredentials: false };
    return this.httpClient.delete<any>(this.BASE_URL + 'deleteCoupon/' + id, options);
  }

  public updateCoupon(coupon: Coupon): Observable<any>{
    const options = { withCredentials: false };
    return this.httpClient.put<any>(this.BASE_URL + "updateCoupon", coupon, options);
  }

  public getOneCoupon(title: string, companyId: number): Observable<Coupon>{
    const options = { withCredentials: false };
    return this.httpClient.get<Coupon>(this.BASE_URL + 'getOneCoupon/' + title + '/' + companyId, options);
  }

  public getCompanyCoupons(): Observable<Coupon[]>{
    const options = { withCredentials: false };
    return this.httpClient.get<Coupon[]>(this.BASE_URL + 'getCoupons', options);
  }

  public getCompanyCouponsByCategory(category: string): Observable<Coupon[]>{
    const options = { withCredentials: false };
    return this.httpClient.get<Coupon[]>(this.BASE_URL + 'getCouponsByCategory/' + category, options);
  }

  public getCompanyCouponsByPrice(maxPrice: number): Observable<Coupon[]>{
    const options = { withCredentials: false };
    return this.httpClient.get<Coupon[]>(this.BASE_URL + 'getCouponsByPrice/' + maxPrice, options);
  }

  public getDetails(): Observable<Company>{
    const options = { withCredentials: false };
    return this.httpClient.get<Company>(this.BASE_URL + 'getDetails', options);
  }
}

