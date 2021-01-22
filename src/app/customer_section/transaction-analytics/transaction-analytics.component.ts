import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import 'chart.js';
import 'chart.piecelabel.js';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

@Component({
  selector: 'app-transaction-analytics',
  templateUrl: './transaction-analytics.component.html',
  styleUrls: ['./transaction-analytics.component.scss']
})
export class TransactionAnalyticsComponent implements OnInit {

  //lineChartData
  public lineChartLabels;
  public lineChartData;
  public lineChartType;
  public lineChartColors;
  public lineChartOptions;
  public lineChartLegend;
  //spark
  public sChartLabels;
  public sChartData1;
  public sChartData2;
  public sChartData3;
  public sChartData4;
  public sChartType;
  public sChartColors;
  public sChartOptions;
  public sChartLegend;
  public sChartPlugins;

  date:any;
  toDate:any;
  fromDate:any;
  startDate:any='';
  endDate:any='';
  currentDate:any;
  startMaxDate:any;
  responseGraph:any;
  graphArray:any=[];
  graph:any=[];

  totalAmount:any;
  totalPayment:any;
  totalCustomers:any;
  totalLoan:any;
  totalAmountGraph:any=[];
  totalPaymentGraph:any=[];
  totalCustomerGraph:any=[];
  totalLoanGraph:any=[];
  totalLabels:any=[];
  totalDates:any=[];
  newPage:any=1;
  config={ itemsPerPage: 10 , currentPage: this.newPage};

  tableData:any=[];
  page : any = 1;
  pageSize = 2;
  dataTable:any=[];
  collectionSize : any;

  formula : string = '';
  csvResp  = [];
  responseForCSV : any;

  constructor(private dataService : DataService) { }

  ngOnInit() {
    this.date = new Date();
     this.currentDate = {
      year: this.date.getFullYear(),
      month: this.date.getMonth() + 1,
      day: this.date.getDate()
    };
    this.startMaxDate = {
      year: this.currentDate.year,
      month: this.currentDate.month-1,
      day: this.currentDate.day
    };
    let startmonth = this.currentDate.month-1;
    this.fromDate = this.currentDate.year + "-" + startmonth + "-" + this.currentDate.day;
    this.toDate = this.currentDate.year + "-" + this.currentDate.month + "-" + this.currentDate.day;

    this.loadGraphData(this.fromDate,this.toDate);
  }

  loadGraphData(start,end){
    this.lineChartData=[];
    this.totalCustomerGraph=[];
    this.totalPaymentGraph=[];
    this.totalLoanGraph=[];
    this.totalAmountGraph=[];
    this.dataService.getTransactionGraph(start,end).subscribe(res=>
    {
      this.responseGraph=res;
      this.graphArray = this.responseGraph.data;

      this.graph = this.responseGraph.data.slice(1,this.graphArray.length);
      // this.tableData = this.graph.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      this.tableData = this.graph;

      this.totalAmount = this.graphArray[0].totalamount;
      this.totalPayment = this.graphArray[0].totalpayment;
      this.totalCustomers = this.graphArray[0].totalcustomer;
      this.totalLoan = this.graphArray[0].totalloan;

      this.collectionSize = this.responseGraph.message.no_of_record;

      for(let i=0;i<this.tableData.length;i++){
        this.totalAmountGraph[i]=this.tableData[i].totalamount;
        this.totalPaymentGraph[i]=this.tableData[i].totalpayment;
        this.totalCustomerGraph[i]=this.tableData[i].totalcustomer;
        this.totalLoanGraph[i]=this.tableData[i].totalloan;
        this.totalLabels[i]='a';
        this.totalDates[i]=this.tableData[i].date.slice(8,10);
      }
    });
    this.loadBarCharts();
    this.loadSparkCharts();
  }


  loadBarCharts(){
    this.lineChartLabels = this.totalDates;
    this.lineChartData = [{ data: this.totalCustomerGraph, label: 'Customers' },
    { data: this.totalPaymentGraph, label: 'Payments' },{ data: this.totalLoanGraph, label: 'Loans' },
    { data: this.totalAmountGraph, label: 'Amounts' }],
    this.lineChartType = 'line';
    this.lineChartLegend = true;
    this.lineChartColors = [
      {backgroundColor : '',
       borderColor : 'rgb(89, 179, 0)'}];
    this.lineChartOptions = { responsive : true,
    legend: {position : 'bottom',labels: {
      padding : 30,usePointStyle : true, fontColor: 'white'}},
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                fontColor: 'rgb(255, 255, 255)'}}],
        xAxes: [{
          ticks: {
            fontColor: 'rgb(255, 255, 255)'}}]
      }
    };
  }

  loadSparkCharts(){
    this.sChartData1 = [{ data: this.totalCustomerGraph}];
    this.sChartData2 = [{ data: this.totalPaymentGraph}];
    this.sChartData3 = [{ data: this.totalLoanGraph}];
    this.sChartData4 = [{ data: this.totalAmountGraph}];
     this.sChartLabels = this.totalLabels;
     this.sChartOptions = {
       responsive: false,
       legend: { display: false },
       elements: { line: { borderColor: '#000000', borderWidth: 2, tension: 0}, point: { radius: 0} },
       tooltips: { enabled: false },
       scales: { yAxes: [{ display: false }], xAxes: [{ display: false }]}
     }; 
     this.sChartColors = [{ borderColor: 'rgb(102, 194, 255)', backgroundColor: 'rgb(51, 51, 51)'}];
     this.sChartLegend = true;
     this.sChartType = 'line';
     this.sChartPlugins = [];
   }

   searchData(){
    let end;
    if(this.startDate == '')
    {
      alert("Please Select Start Date")
      return;
    }
    if(this.endDate == '')
    {
      alert("Please Select End Date")
      return;
    }
    else
    {
      if(this.endDate!='')
      {end = this.endDate.year + "-" + this.endDate.month + "-" + this.endDate.day;}
      if(this.endDate==''){end = this.toDate;}
      let start = this.startDate.year + "-" + this.startDate.month + "-" + this.startDate.day;
      if(this.startDate.day>this.endDate.day){
        if(this.startDate.month>this.endDate.month || this.startDate.month==this.endDate.month){
          alert("Please Select Valid Date")
        }else{
          this.totalDates=[];
          // this.lineChartLabels=[];
          this.loadGraphData(start,end);
        }
      }
      else if(this.startDate.day>this.endDate.day){
        if(this.endDate.month>this.startDate.month){
          alert("Please Select Valid Date")
        }else{
          this.totalDates=[];
          // this.lineChartLabels=[];
          this.loadGraphData(start,end);
        }
      }
      else{
        this.totalDates=[];
        this.tableData=[];
        // this.lineChartLabels=[];
        this.loadGraphData(start,end);
      }
    }
   }

   download()
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
      headers : ["Date","Customer","Payment","Loan","Amount"]
    }
    let end;

    this.formula = 'transactionReport';
    if(this.endDate!='')
    {end = this.endDate.year + "-" + this.endDate.month + "-" + this.endDate.day;}
    if(this.endDate==''){end = this.toDate;}
    let start = this.startDate.year + "-" + this.startDate.month + "-" + this.startDate.day;

    this.dataService.downloadCSV(start,end).subscribe(res => 
    {
      this.responseForCSV = res;
      for(let i=0 ; i<this.responseForCSV.data.length ; i++){
        this.csvResp[i] = this.responseForCSV.data[i];
      }
      new Angular5Csv(this.csvResp,this.formula,options);
    });
  }

  pageChange(newP:number){
    this.newPage=newP;
    this.config.currentPage=this.newPage;
  }

}
