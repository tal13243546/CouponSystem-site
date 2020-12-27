import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/Company';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {

  company= new Company();

  // token: string;

  id:number;

  constructor(private adminService: AdminServiceService, private router: Router, private activatedRoute: ActivatedRoute)
  {
    this.id = +(this.activatedRoute.snapshot.params.id);
    // this.token = this.activatedRoute.snapshot.params.token;
   }

  ngOnInit(): void {
    if (this.id) {
      this.getOneCompany(this.id);
    }
  }

  public goTo(): void {
    this.router.navigateByUrl('admin');
  }

  public addCompany(){
    console.log(this.company);
    this.adminService.addCompany(this.company).subscribe(
      (res)=>{this.goTo();},
      (err)=>{alert(err.error); console.log(err.message);});
  }

  public getOneCompany(id: number){
    this.adminService.getOneCompany(id).subscribe(
      (res)=>{this.company=res},
      (err)=>{console.log(err.message);});
  }

  public updateCompany(){
    this.adminService.updateCompany(this.company).subscribe(
      (res)=>{this.goTo();},
      (err)=>{alert(err.error); console.log(err.message);});
  }

}
