import { LoginResponse } from './../models/LoginResponse';
import { Customer } from 'src/app/models/Customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/Company';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private BASE_URL = 'http://localhost:8080/admin/'

  constructor(private httpClient: HttpClient) { }

  public adminLogin(email: string, password: string): Observable<LoginResponse>{
    const options = { withCredentials: true};
    return this.httpClient.post<LoginResponse>(this.BASE_URL + 'login/' + email + "/" + password, options);
  }

  public adminLogout(): Observable<any>{
    const options = { withCredentials: false};
    return this.httpClient.delete<any>(this.BASE_URL + 'logout', options);
  }

  public getAllCompanies(): Observable<Company[]>{
    const options = {withCredentials: false};
    return this.httpClient.get<Company[]>(this.BASE_URL + 'getAllCompanies', options);
  }

  public getOneCompany(id: number): Observable<Company>{
    const options = {withCredentials: false};
    return this.httpClient.get<Company>(this.BASE_URL + 'getOneCompany/' + id, options)
  }

  public deleteCompany(id: number): Observable<any>{
    const options = {withCredentials: false};
    return this.httpClient.delete<any>(this.BASE_URL + 'deleteCompany/' + id, options)
  }

  public addCompany(company: Company): Observable<any> {
    const company2 = {
      name: company.name,
      email: company.email,
      password: company.password
    }
    const options = { withCredentials: false };
    return this.httpClient.post<any>(this.BASE_URL + "addCompany", company2, options);
  }

  public updateCompany(company: Company): Observable<any>{
    const options = {withCredentials: false};
    return this.httpClient.put<any>(this.BASE_URL + "updateCompany", company, options)
  }

  public getAllCustomers(): Observable<Customer[]>{
    const options = {withCredentials: false};
    return this.httpClient.get<Customer[]>(this.BASE_URL + 'getAllCustomers', options)
  }

  public getOneCustomer(id: number): Observable<Customer>{
    const options = {withCredentials: false};
    return this.httpClient.get<Customer>(this.BASE_URL + 'getOneCustomer/' + id, options)
  }

  public deleteCustomer(id: number): Observable<any>{
    const options = {withCredentials: false};
    return this.httpClient.delete<any>(this.BASE_URL + 'deleteCustomer/' + id, options)
  }

  public addCustomer(customer: Customer): Observable<any> {
    const customer2 = {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      password: customer.password
    }
    const options = {withCredentials: false};
    return this.httpClient.post<any>(this.BASE_URL + "addCustomer", customer2, options);
  }

  public updateCustomer(customer: Customer): Observable<any>{
    const options = {withCredentials: false};
    return this.httpClient.put<any>(this.BASE_URL + "updateCustomer", customer, options)
  }

}
