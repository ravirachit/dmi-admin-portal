import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import 'chart.js';
import 'chart.piecelabel.js';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

@Component({
  selector: 'app-partnerevents',
  templateUrl: './partnerevents.component.html',
  styleUrls: ['./partnerevents.component.scss']
})
export class PartnereventsComponent implements OnInit {

  //pieChartData
  public pieChartLabels;
  public pieChartData;
  public pieChartType;
  public pieChartColors;
  public pieChartOptions;
  public piePlugins;
  //lineChartData
  public lineChartLabels;
  public lineChartData;
  public lineChartType;
  public lineChartColors;
  public lineChartOptions;
  public lineChartLegend;
  //spark
  public sChartLabels;
  public sTotalFeedback;public sTodayFeedback;
  public sTotalNPS;public sTodayNPS;
  public sChartType;
  public sChartColors;
  public sChartOptions;
  public sChartLegend;
  public sChartPlugins;

  date:any;
  toDate:any;
  fromDate:any;
  currentDate:any;
  startDate:any='';
  endDate:any='';
  startMaxDate:any;
  tableData:any=[];
  response:any;
  formula : string = '';
  csvResp  = [];
  responseForCSV : any;
  lineGraphDates:any=[];
  mainGraphResponse:any;
  mainGraph:any=[];
  totalFeedbackGraph:any=[];
  totalGoodFeedback:any=[];
  totalAvgFeedback:any=[];
  totalPoorFeedback:any=[];
  goodRate:any;
  averageRate:any;
  badRate:any;
  graphResponse:any;
  todayNPS:any;
  totalNPS:any;
  todayFeedback:any;
  totalFeedback:any;
  options:any={};
  newPage:any=1;
  config={ itemsPerPage: 10 , currentPage: this.newPage};


  constructor(private dataService : DataService) {}

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

  loadGraphData(date1,date2){
    this.dataService.getFeedbackGraph(date1,date2,1,500).subscribe(res=>{
      this.response = res;
      this.tableData = this.response.data; 
    });
    this.dataService.getRatingGraph(date1,date2).subscribe(res=>{
      this.graphResponse=res;
      this.goodRate=this.graphResponse.data[0].promoters_feedback;
      this.averageRate=this.graphResponse.data[0].passive_feedback;
      this.badRate=this.graphResponse.data[0].detractor_feedback;
      this.totalNPS=this.graphResponse.data[0].total_nps_percent;
      this.todayNPS=this.graphResponse.data[0].today_nps_percent;
      this.totalFeedback=this.graphResponse.data[0].total_feedback;
      this.todayFeedback=this.graphResponse.data[0].today_feedback;
      this.loadPieChart();
      this.loadSparkCharts();
    });
    this.dataService.getMainRatingGraph(date1,date2).subscribe(res=>{
      this.mainGraphResponse=res;
      this.mainGraph=this.mainGraphResponse.data;
      for(let i=0;i<this.mainGraph.length;i++){
        this.totalFeedbackGraph[i]=this.mainGraph[i].totalrating;
        this.totalGoodFeedback[i]=this.mainGraph[i].promoters_feedback;
        this.totalAvgFeedback[i]=this.mainGraph[i].passive_feedback;
        this.totalPoorFeedback[i]=this.mainGraph[i].detractor_feedback;
        this.lineGraphDates[i]=this.mainGraph[i].date.slice(8,10);
      }
      this.loadBarCharts();
    });
  }

  loadPieChart(){
    this.pieChartLabels = ['Good', 'Average','Bad'];
    this.pieChartData = [this.goodRate, this.averageRate,this.badRate];
    this.pieChartType = 'pie';
    this.pieChartColors = [
      {backgroundColor: ['rgb(56, 142, 60)','rgb(21, 101, 192)','rgb(204, 204, 0)'],
       borderColor : ['rgb(57, 55, 55)','rgb(57, 55, 55)','rgb(57, 55, 55)']}];
    this.pieChartOptions = {
      responsive : true,
      maintainAspectRatio: false,
      legend: {
        position : 'bottom',
        labels: {
          usePointStyle : true,
          fontColor: 'white',
        }},
      pieceLabel: {
        render: 'percentage',
        fontColor: 'white',
        fontSize: 14}
    };
  }

  loadBarCharts(){
    this.lineChartLabels = this.lineGraphDates;
    this.lineChartData = [{ data: this.totalFeedbackGraph, label: 'Average Feedback' },{ data: this.totalGoodFeedback, label: 'Positive Feedback' }
  ,{ data: this.totalAvgFeedback, label: 'Neutral Feedback' },{ data: this.totalPoorFeedback, label: 'Negative Feedback' }];
    this.lineChartType = 'line';
    this.lineChartLegend = true;
    this.lineChartColors = [
      {backgroundColor : '',
       borderColor : ['rgb(56, 142, 60)']}];
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
  //  this.sTodayFeedback = [{ data: this.totalLogin}]; 
  //  this.sTotalFeedback = [{ data: this.todayLogin}];
  //  this.sTodayNPS = [{data: this.totalLogin}];
  //  this.sTotalNPS = [{data: this.totallogin}];
   
  //   this.sChartLabels = this.labels;
  //   this.sChartOptions = {
  //     responsive: false,
  //     legend: { display: false },
  //     elements: { line: { borderColor: '#000000', borderWidth: 2, tension: 0}, point: { radius: 0} },
  //     tooltips: { enabled: false },
  //     scales: { yAxes: [{ display: false }], xAxes: [{ display: false }]}
  //   };
  //   this.sChartColors = [{ borderColor: 'rgb(102, 194, 255)', backgroundColor: 'rgb(51, 51, 51)'}];
  //   this.sChartLegend = true;
  //   this.sChartType = 'line';
  //   this.sChartPlugins = [];
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
    else{
      if(this.endDate!='')
      {end = this.endDate.year + "-" + this.endDate.month + "-" + this.endDate.day;}
      if(this.endDate==''){end = this.toDate;}
      let start = this.startDate.year + "-" + this.startDate.month + "-" + this.startDate.day;
      if(this.startDate.day>this.endDate.day){
        if(this.startDate.month>this.endDate.month || this.startDate.month==this.endDate.month){
          alert("Please Select Valid Date")
        }else{
          this.loadGraphData(start,end);
          this.lineChartData=[];
          this.lineGraphDates=[];
          this.lineChartLabels=[];
        }
      }
      else if(this.startDate.day>this.endDate.day){
        if(this.endDate.month>this.startDate.month){
          alert("Please Select Valid Date")
        }else{
          this.loadGraphData(start,end);
          this.lineChartData=[];
          this.lineGraphDates=[];
          this.lineChartLabels=[];
        }
      }
      else{
        this.loadGraphData(start,end);
        this.lineChartData=[];
        this.lineGraphDates=[];
        this.lineChartLabels=[];
      }
    }
  }

  download()
  {
    this.csvResp = [];
    this.options = {
      title : '',
      fieldSeparator : ',',
      quoteStrings : '"',
      decimalSeparator : '.',
      showLabels : true,
      showTitle : false,
      useBom : true,
      headers : ["Customer Number","Feedback","Rating","Date"]
    } 
    
    this.formula = 'feedbackAnalytics';

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
    else{
      if(this.endDate!='')
      {end = this.endDate.year + "-" + this.endDate.month + "-" + this.endDate.day;}
      if(this.endDate==''){end = this.toDate;}
      let start = this.startDate.year + "-" + this.startDate.month + "-" + this.startDate.day;
      if(this.startDate.day>this.endDate.day){
        if(this.startDate.month>this.endDate.month || this.startDate.month==this.endDate.month){
          alert("Please Select Valid Date")
        }else{
          this.getDownload(start,end);
        }
      }
      else if(this.startDate.day>this.endDate.day){
        if(this.endDate.month>this.startDate.month){
          alert("Please Select Valid Date")
        }else{
          this.getDownload(start,end);
        }
      }
      else{
        this.getDownload(start,end);
      }
    }
  }

  getDownload(start,end){
    this.dataService.getDownloadGraph(start,end).subscribe(res => 
    {
      this.responseForCSV = res;
      for(let i=0 ; i<this.responseForCSV.data.length ; i++){
        this.csvResp[i] = this.responseForCSV.data[i];
      }
      new Angular5Csv(this.csvResp,this.formula,this.options);
    });
  }

  pageChange(newP:number){
    this.newPage=newP;
    this.config.currentPage=this.newPage;
  }

}
