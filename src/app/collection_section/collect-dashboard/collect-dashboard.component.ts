import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-collect-dashboard',
  templateUrl: './collect-dashboard.component.html',
  styleUrls: ['./collect-dashboard.component.scss']
})
export class CollectDashboardComponent implements OnInit {

  response:any = '';
  headerDetails:any='';
  detailData:any=[];

  constructor(private service: DataService) { }

  ngOnInit() {
    this.getRecentDetails();
  }

  getRecentDetails(){
    this.service.collectionRecentData().subscribe(res=>{
      this.response = res;
      this.headerDetails = this.response.message;
      this.detailData = this.response.data;
    })
  }

}
