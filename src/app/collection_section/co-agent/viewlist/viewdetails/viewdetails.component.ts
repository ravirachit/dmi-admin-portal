import {Component, QueryList, ViewChildren, OnInit , ViewChild , ViewContainerRef} from '@angular/core';
import { DataService } from '../../../../data.service';
import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';

import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';

import {View} from './view';
import {ViewService} from './view.service';
import {NgbdSortableHeader, SortEvent} from '../../../../sortable.directive';
import {SharedataService} from '../../../../sharedata.service';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';


import {NgbTabset} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.scss'],
  providers: [ViewService, DecimalPipe]
})
export class ViewdetailsComponent implements OnInit {

  //view$: Observable<View[]>;
  // total$: Observable<number>;
  collectionid: any;
  sms : any;
  createdby : any;
  payment: any;
  phone:any='';
  pageno:any;
  records:any;
  collectiondata:any;
  response : any;
  headersRes : any;
  listresp : any;
  showSMS : boolean = false;
  showReminder : boolean = false;
  loadData$ : any = 0;
  loadDataUnpaid$ : any = 0;

  viewPaid = [];
  viewUnpaid = [];

  //pagination
  pagePaid : any = 1;
  pageSizePaid = 5;
  collectionSizePaid : any;
  pageUnPaid : any = 1;
  pageSizeUnpaid = 5;
  collectionSizeUnPaid : any;
  logsList: any;
  historyList: any;

  //borrowUsers
  totalUsers : any;
  totalPaidUsers : any;
  totalUnPaidUsers : any;

  //amount
  totalAmount : any;
  totalPaid : any;
  totalUnPaidAmount : any;

  id : any;
  tabId : any;
  datapresentPaid : boolean = false;
  datapresentUnPaid : boolean = false;

  userIdArray : Array<any> = [];
  getRespCreateURI : boolean = false;
  formula : string = '';
  csvResp  = [];
  responseForCSV : any;

  addDataPayment:any='';
  addDataSend:any='';
  addDataReminder:any='';
  dataStatus:any='';
  listName:any='';

  histryResp:any='';
  histryResponse:any=[];

  showCreatePayment:boolean=false;
  showSendSMS:boolean=false;
  showReceiveSMS:boolean=false;


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private http: HttpClient, private data: DataService, private route: ActivatedRoute,
    public service: ViewService , public shareData : SharedataService) {
    //this.view$ = service.countries$;
    // this.total$ = service.total$;
    this.id=localStorage.getItem('Id');
    this.listName=localStorage.getItem('listName');
   }

   users: Object;

  ngOnInit()
  {
    this.phone = localStorage.getItem('phone');
    this.getHeaderDetails();
    this.paidDetails(this.id,1,1,this.phone,1,7);
    // this.logHistory();
    this.getRecentActv();
  }

  getTabChange(event)
  {
    this.tabId = event.nextId;
    if(this.tabId == 1)
    {this.paidDetails(this.id,1,1,this.phone,1,7);}
    else
    {this.unpaidDetails(this.id,1,2,this.phone,1,7);}
  }

  getRecentActv(){
    this.data.recentActivity(this.id).subscribe(res=>{
      this.histryResp = res;
      this.histryResponse = this.histryResp.data[0];
      this.addDataPayment = this.histryResponse.createpaymentlink.add_date;
      this.addDataSend = this.histryResponse.remaindersms.add_date;
      this.addDataReminder = this.histryResponse.firstsendsms.add_date;
    });
  }

  getCollectionUserId(event,value){
    if(event.target.checked){
      this.userIdArray.push(value);
    }
    else{
      let index = this.userIdArray.indexOf(value);
      this.userIdArray.splice(index,1);
    }
  }

  createURI(){
    let arrayValues = this.userIdArray.toString();
    if(this.userIdArray.length == 0){
      alert('Please Select Atleast One User.')
    }
    else{
      this.data.createURICollection(this.id,arrayValues).subscribe(res=>{
        if(res){this.showSMS=true;}
      });
    }
  }

  logHistory(){
    this.data.collectionLog(this.id).subscribe(res=>{
      this.historyList = res;
      this.logsList = this.historyList.data;
      for(let i=0;i<this.logsList.length;i++){
        if(this.logsList[i].status == 3){
          this.showSMS = true;
        }
        else if(this.logsList[i].status == 1){
          this.showReminder = true;
          this.showSMS = false;
        }
        else if(this.logsList[i].status == 2){
          this.showSMS = false;
        }
      }

    });
  }

  sendSMS(){
    let arrayValues = this.userIdArray.toString();
    if(this.userIdArray.length == 0){
      alert('Please Select Atleast One User.')
    }
    else{
      this.data.createSMSCollection(this.id,arrayValues).subscribe(res=>{
        if(res){this.showReminder = true;this.getRespCreateURI = false;}
      });
    }
  }

  remainderSMS(){
    let arrayValues = this.userIdArray.toString();
    if(this.userIdArray.length == 0){
      alert('Please Select Atleast One User.')
    }
    else{
      this.data.sendreminderCollection(this.id,arrayValues).subscribe(res=>{
        if(res){this.showSMS = false;}
      })
    }
  }

  getHeaderDetails()
  {
    this.data.getCollectionHeadersData(this.id).subscribe( res => 
    {
      this.headersRes = res;
      let arr = this.headersRes.data;

      for(let i=0;i<arr.length;i++)
      {
        this.totalUsers = arr[i].totaluser;
        this.totalPaidUsers = arr[i].totalpaiduser;
        this.totalUnPaidUsers = arr[i].totalunpaiduser;
  
        this.totalAmount = arr[i].totalamount;
        this.totalPaid = arr[i].totalpaidamount;
        this.totalUnPaidAmount = arr[i].totalpendingamount;
      }
     // let totalDetails = this.response.message.user;
    });
  }

  showDetails(value,phone){
    this.shareData.setListId(value);
    localStorage.setItem('SelectedPhone',phone);
  }

  paidDetails(id,created,payment,phone,page,record)
  {
    this.collectionid = id;
    //this.sms = sms;
    this.createdby = created;
    this.payment = payment;
    this.phone = phone;
    this.pageUnPaid = page;
    this.pageSizeUnpaid = record;

    this.data.getCollectionFileUser(this.collectionid,this.createdby,this.payment,this.phone,this.pagePaid,this.pageSizePaid).subscribe(res => 
    {
      this.response = res;
      let arr = this.response.data;
      //let totalDetails = this.response.message.user;

      this.collectionSizePaid = this.response.message.totalcollectionuser;

      if(this.response.message.error == "No Data Available.")
      {this.datapresentPaid = false;}
      else{this.datapresentPaid = true;}
      
      for(let i=0;i<arr.length;i++)
      {
        this.viewPaid[i] = arr[i];
      }
    });
    this.loadData$=1;
  }

  unpaidDetails(id,created,payment,phone,page,record)
  {
    this.collectionid = id;
    //this.sms = sms;
    this.createdby = created;
    this.payment = payment;
    this.phone = phone;
    this.pageUnPaid = page;
    this.pageSizeUnpaid = record;
    
    this.data.getCollectionFileUser(this.collectionid,this.createdby,2,this.phone,this.pageUnPaid,this.pageSizeUnpaid).subscribe( res =>
    {
      this.listresp = res;
      let arr = this.listresp.data;
      this.collectionSizeUnPaid = this.listresp.message.totalcollectionuser;

      if(this.listresp.message.error == "No Data Available.")
      {this.datapresentUnPaid = false;
      }else{this.datapresentUnPaid = true;}

      for(let i=0;i<arr.length;i++)
      {
        this.viewUnpaid[i] = arr[i];
      }
      this.loadDataUnpaid$=1;
    });
  }

  onPaidPageChange(page : number)
  {
    this.viewPaid=[];
    this.paidDetails(this.id,1,1,this.phone,page,7)
  }

  onUnpaidPageChange(page : number)
  {
    this.viewUnpaid=[];
    this.unpaidDetails(this.id,1,2,this.phone,page,7);
  }

  download(event)
  {
    this.csvResp = [];
    var options = {
      title : '',
      fieldSeparator : ',',
      quoteStrings : '"',
      decimalSeparator : '.',
      showLabels : true,
      showTitle : false,
      useBom : true,
      headers : ['Name','Email ID','Phone','Amount','Due Date']
    }
    
    if(event == 1)
    {
      this.formula = 'totalBorrowers';
      this.data.getFileUserExports(this.id,1,"",this.phone).subscribe(res => 
      {
        this.responseForCSV = res;
        for(let i=0 ; i<this.responseForCSV.data.length ; i++){
          this.csvResp[i] = this.responseForCSV.data[i];
        }
        new Angular5Csv(this.csvResp,this.formula,options);
      });
    }
    else if(event == 2)
    {
      this.formula = 'totalPaid';
      this.data.getFileUserExports(this.id,1,1,this.phone).subscribe(res=>
      {
        this.responseForCSV = res;
        for(let i=0;i<this.response.data.length;i++){
          this.csvResp[i] = this.responseForCSV.data[i];
        }
        new Angular5Csv(this.csvResp,this.formula,options);
      });
    }
    else if(event == 3)
    {
      this.formula = 'totalUnPaid';
      this.data.getFileUserExports(this.id,1,2,this.phone).subscribe(res=>
      {
        this.responseForCSV = res;
        for(let i=0;i<this.responseForCSV.data.length;i++){
          this.csvResp[i] = this.responseForCSV.data[i];
        }
        new Angular5Csv(this.csvResp,this.formula,options);
      });
    }
  }
  
}
