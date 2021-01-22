import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-payment-tracking',
  templateUrl: './payment-tracking.component.html',
  styleUrls: ['./payment-tracking.component.scss']
})
export class PaymentTrackingComponent implements OnInit {

  page : any = 1;
  pageSize = 9;
  collectionSize : any;
  summaryResponse:any;
  responseSummary:any=[];
  showLoader:boolean = false;

  constructor(private service:DataService) { }

  ngOnInit() {
    this.getSummaryDetails();
  }

  getSummaryDetails(){
    this.showLoader=true;
    this.service.AdminLogSummary(localStorage.getItem('phone'),this.page,this.pageSize).subscribe(res=>{
      this.summaryResponse = res;
      this.showLoader = false;
      this.responseSummary = this.summaryResponse.data;
      this.collectionSize = this.summaryResponse.message;
    })
  }

  loadPage(pagechange:number){
    this.showLoader=true;
    this.service.AdminLogSummary(localStorage.getItem('phone'),pagechange,this.pageSize).subscribe( res =>
    {
      this.showLoader = false;
      this.summaryResponse = res;
      this.responseSummary = this.summaryResponse.data;
    });
  }

}
