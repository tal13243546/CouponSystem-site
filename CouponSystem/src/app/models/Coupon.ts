export class Coupon{
  constructor(
    public id?:number,
    public companyId?:number,
    public category?:string,
    public title?:string,
    public description?:string,
    public startDate?:Date,
    public endDate?:Date,
    public amount?:number,
    public price?:number,
    public image?:string){}
}
