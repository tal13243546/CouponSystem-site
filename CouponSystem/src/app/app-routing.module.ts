import { CustomerCouponsComponent } from './components/customer-coupons/customer-coupons.component';
import { CouponFormComponent } from './components/coupon-form/coupon-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ContentComponent } from './components/content/content.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CompanyComponent } from './components/company/company.component';
import { AdminComponent } from './components/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: ContentComponent, pathMatch: 'full'},
  {path: 'admin', component: AdminComponent},
  {path: 'company', component: CompanyComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'companyForm/:token', component: CompanyFormComponent},
  {path: 'companyForm/update/:id/:token', component: CompanyFormComponent},
  {path: 'customerForm/:token', component: CustomerFormComponent},
  {path: 'customerForm/update/:id/:token', component: CustomerFormComponent},
  {path: 'couponForm/:companyId/:token', component: CouponFormComponent},
  {path: 'couponForm/update/:title/:companyId/:token', component: CouponFormComponent},
  {path: 'customerCoupons/:token', component: CustomerCouponsComponent},
  {path: 'page-not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: "page-not-found", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
