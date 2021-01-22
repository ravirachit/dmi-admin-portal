import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import 'chart.js';
import 'chart.piecelabel.js';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

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

  public sChartData1;public sChartData2;public sChartData3;
  public sDashboard1;public sDashboard2;public sDashboard3;
  public sLoanDetails1;public sLoanDetails2;public sLoanDetails3;
  public swelcomeLetter1;public swelcomeLetter2;public swelcomeLetter3;
  public snoc1;public snoc2;public snoc3;
  public spaymentsummary1;public spaymentsummary2;public spaymentsummary3;
  public spaymentsummarydown1;public spaymentsummarydown2;public spaymentsummarydown3;
  public stotalblogs1;public stotalblogs2;public stotalblogs3;
  public stotalblogsdetails1;public stotalblogsdetails2;public stotalblogsdetails3;
  public sticketPage1;public sticketPage2;public sticketPage3;
  public sticketCreated1;public sticketCreated2;public sticketCreated3;
  public sfeedback1;public sfeedback2;public sfeedback3;
  public snotification1;public snotification2; public snotification3;
  public shelpcenter1;public shelpcenter2;public shelpcenter3;
  public scategoryDetails1;public scategoryDetails2;public scategoryDetails3;
  public sarticleFeedback1;public sarticleFeedback2;public sarticleFeedback3;
  public slogouts1;public slogouts2;public slogouts3;
  
  public sChartType;
  public sChartColors;
  public sChartOptions;
  public sChartLegend;
  public sChartPlugins;

  date:any;
  currentDate:any;
  graphResponse:any;
  graphData : any = [];
  lineGraphDates : any = [];
  totalUsers : any = [];
  newUsers : any = [];
  logins : any = [];
  totalLogin : any= [];
  todayLogin : any=[];
  uniqueLogin : any=[];
  labels : any=[];
  totalPieUsers : any;
  totalNewPieUsers : any;
  todayUnique:any;
  totalLoginUsers : any;
  todayLoginUsers:any;
  uniqueLoginUsers:any;
  startDate:any='';
  endDate:any='';
  selectedUser1 : any = "All Users";
  selectedUser2 : any = "All Users";
  fromDate:any;
  toDate:any;
  startMaxDate:any;
  lineChartCondition:any=[];
  formula : string = '';
  csvResp  = [];
  excel = [];
  responseForCSV : any;
  responseForExcel:any;
  excelabc: any=[];

  optionList : any = [
    {name: 'All Users', id: 1},
    {name: 'New Users', id: 2},
    {name: 'Total Users', id: 3}
  ]

  totalDashboard : any= [];todayDashboard : any=[];uniqueDashboard : any=[];
  totalDashboardUsers : any;todayDashboardUsers:any;uniqueDashboardUsers:any;
  totalloans : any= [];todayloans : any=[];uniqueloans : any=[];
  totalloansUsers : any;todayloansUsers:any;uniqueloansUsers:any;
  totalwelcome : any= [];todaywelcome : any=[];uniquewelcome : any=[];
  totalwelcomeUsers : any;todaywelcomeUsers:any;uniquewelcomeUsers:any;
  totalnoc : any= [];todaynoc : any=[];uniquenoc : any=[];
  totalnocUsers : any;todaynocUsers:any;uniquenocUsers:any;
  totalpaymentSummary : any= [];todaypaymentSummary : any=[];uniquepaymentSummary : any=[];
  totalpaymentSummaryUsers : any;todaypaymentSummaryUsers:any;uniquepaymentSummaryUsers:any;
  totaldownloadpayment : any= [];todaydownloadpayment : any=[];uniquedownloadpayment : any=[];
  totaldownloadpaymentUsers : any;todaydownloadpaymentUsers:any;uniquedownloadpaymentUsers:any;
  totalblogs : any= [];todayblogs : any=[];uniqueblogs : any=[];
  totalblogsUsers : any;todayblogsUsers:any;uniqueblogsUsers:any;
  totalblogsdetails : any= [];todayblogsdetails : any=[];uniqueblogsdetails : any=[];
  totalblogsdetailsUsers : any;todayblogsdetailsUsers:any;uniqueblogsdetailsUsers:any;
  totalticket : any= [];todayticket : any=[];uniqueticket : any=[];
  totalticketUsers : any;todayticketUsers:any;uniqueticketUsers:any;
  totalticketpage : any= [];todayticketpage: any=[];uniqueticketpage : any=[];
  totalticketpageUsers : any;todayticketpageUsers:any;uniqueticketpageUsers:any;
  totalfeedback : any= [];todayfeedback : any=[];uniquefeedback : any=[];
  totalfeedbackUsers : any;todayfeedbackUsers:any;uniquefeedbackUsers:any;
  totalnotif : any= [];todaynotif : any=[];uniquenotif : any=[];
  totalnotifUsers : any;todaynotifUsers:any;uniquenotifUsers:any;
  totalhelp : any= [];todayhelp : any=[];uniquehelp : any=[];
  totalhelpUsers : any;todayhelpUsers:any;uniquehelpUsers:any;
  totalcatdetails : any= [];todaycatdetails : any=[];uniquecatdetails : any=[];
  totalcatdetailsUsers : any;todaycatdetailsUsers:any;uniquecatdetailsUsers:any;
  totalarticlefeed : any= [];todayarticlefeed : any=[];uniquearticlefeed : any=[];
  totalarticlefeedUsers : any;todayarticlefeedUsers:any;uniquearticlefeedUsers:any;
  totallogout : any= [];todaylogout : any=[];uniquelogout : any=[];
  totallogoutUsers : any;todaylogoutUsers:any;uniquelogoutUsers:any;


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
  
  constructor(private dataService : DataService) {}

  loadGraphData(date1,date2){
    this.todayLoginUsers=[], this.uniqueLoginUsers=[];this.todayUnique=[];
    this.newUsers = [],this.totalUsers = [];

    this.totalDashboard=[];this.todayDashboard=[];this.uniqueDashboard=[];  this.totalDashboardUsers=[];this.todayDashboardUsers=[];this.uniqueDashboardUsers=[];
    this.totalloans=[];this.todayloans=[];this.uniqueloans=[];  this.totalloansUsers=[];this.todayloansUsers=[];this.uniqueloansUsers=[];
    this.totalwelcome= [];this.todaywelcome=[];this.uniquewelcome=[];  this.totalwelcomeUsers=[];this.todaywelcomeUsers=[];this.uniquewelcomeUsers=[];
    this.totalnoc= [];this.todaynoc=[];this.uniquenoc=[];  this.totalnocUsers=[];this.todaynocUsers=[];this.uniquenocUsers=[];
    this.totalpaymentSummary= [];this.todaypaymentSummary=[];this.uniquepaymentSummary=[];  this.totalpaymentSummaryUsers=[];this.todaypaymentSummaryUsers=[];this.uniquepaymentSummaryUsers=[];
    this.totaldownloadpayment= [];this.todaydownloadpayment=[];this.uniquedownloadpayment=[];  this.totaldownloadpaymentUsers=[];this.todaydownloadpaymentUsers=[];this.uniquedownloadpaymentUsers=[];
    this.totalblogs= [];this.todayblogs=[];this.uniqueblogs=[];  this.totalblogsUsers=[];this.todayblogsUsers=[];this.uniqueblogsUsers=[];
    this.totalblogsdetails= [];this.todayblogsdetails=[];this.uniqueblogsdetails=[];  this.totalblogsdetailsUsers=[];this.todayblogsdetailsUsers=[];this.uniqueblogsdetailsUsers=[];
    this.totalticket= [];this.todayticket=[];this.uniqueticket=[];  this.totalticketUsers=[];this.todayticketUsers=[];this.uniqueticketUsers=[];
    this.totalticketpage= [];this.todayticketpage=[];this.uniqueticketpage=[];  this.totalticketpageUsers=[];this.todayticketpageUsers=[];this.uniqueticketpageUsers=[];
    this.totalfeedback= [];this.todayfeedback=[];this.uniquefeedback=[];  this.totalfeedbackUsers=[];this.todayfeedbackUsers=[];this.uniquefeedbackUsers=[];
    this.totalnotif= [];this.todaynotif=[];this.uniquenotif=[];  this.totalnotifUsers=[];this.todaynotifUsers=[];this.uniquenotifUsers=[];
    this.totalhelp= [];this.todayhelp=[];this.uniquehelp=[];  this.totalhelpUsers=[];this.todayhelpUsers=[];this.uniquehelpUsers=[];
    this.totalcatdetails= [];this.todaycatdetails=[];this.uniquecatdetails=[];  this.totalcatdetailsUsers=[];this.todaycatdetailsUsers=[];this.uniquecatdetailsUsers=[];
    this.totalarticlefeed= [];this.todayarticlefeed=[];this.uniquearticlefeed=[];  this.totalarticlefeedUsers=[];this.todayarticlefeedUsers=[];this.uniquearticlefeedUsers=[];
    this.totallogout= [];this.todaylogout=[];this.uniquelogout=[];  this.totallogoutUsers=[];this.todaylogoutUsers=[];this.uniquelogoutUsers=[];

    this.dataService.getGraphData(date1,date2).subscribe(res=>{
      this.graphResponse = res;
      this.graphData = this.graphResponse.data[0].graph_data;
      this.logins = this.graphResponse.data.login_data;
      
      for(let i=0;i<this.graphData.length;i++){
        this.totalUsers[i] = this.graphData[i].total_user;
        this.newUsers[i] = this.graphData[i].new_user;
        this.todayUnique = this.graphData[i].new_user;
        this.lineGraphDates[i] = this.graphData[i].date.slice(8,10);
      }

      for(let i=0;i<this.logins.length;i++)
      {
        this.totalLogin[i] = this.logins[i].total_login;
        this.todayLogin[i] = this.logins[i].today_login;
        this.uniqueLogin[i] = this.logins[i].unique_login;
        this.totalDashboard[i] = this.logins[i].total_dashboard;
        this.todayDashboard[i] = this.logins[i].today_dashboard;
        this.uniqueDashboard[i] = this.logins[i].unique_dashboard;
        this.totalloans[i] = this.logins[i].total_loan_details;
        this.todayloans[i] = this.logins[i].today_loan_details;
        this.uniqueloans[i] = this.logins[i].unique_loan_details;
        this.totalwelcome[i] = this.logins[i].total_welcome_letter;
        this.todaywelcome[i] = this.logins[i].today_welcome_letter;
        this.uniquewelcome[i] = this.logins[i].unique_welcome_letter;
        this.totalnoc[i] = this.logins[i].total_noc;
        this.todaynoc[i] = this.logins[i].today_noc;
        this.uniquenoc[i] = this.logins[i].unique_noc;
        this.totalpaymentSummary[i] = this.logins[i].total_payment_summary;
        this.todaypaymentSummary[i] = this.logins[i].today_payment_summary;
        this.uniquepaymentSummary[i] = this.logins[i].unique_payment_summary;
        this.totaldownloadpayment[i] = this.logins[i].total_download_payment_summary;
        this.todaydownloadpayment[i] = this.logins[i].today_download_payment_summary;
        this.uniquedownloadpayment[i] = this.logins[i].unique_download_payment_summary;
        this.totalblogs[i] = this.logins[i].total_blogs;
        this.todayblogs[i] = this.logins[i].today_blogs;
        this.uniqueblogs[i] = this.logins[i].unique_blogs;
        this.totalblogsdetails[i] = this.logins[i].total_blog_details;
        this.todayblogsdetails[i] = this.logins[i].today_blog_details;
        this.uniqueblogsdetails[i] = this.logins[i].unique_blog_details;
        this.totalticketpage[i] = this.logins[i].total_ticket_creation_page;
        this.todayticketpage[i] = this.logins[i].today_ticket_creation_page;
        this.uniqueticketpage[i] = this.logins[i].unique_ticket_creation_page;
        this.totalticket[i] = this.logins[i].total_tickets_created;
        this.todayticket[i] = this.logins[i].today_tickets_created;
        this.uniqueticket[i] = this.logins[i].unique_tickets_created;
        this.totalfeedback[i] = this.logins[i].total_feedback;
        this.todayfeedback[i] = this.logins[i].today_feedback;
        this.uniquefeedback[i] = this.logins[i].unique_feedback;
        this.totalnotif[i] = this.logins[i].total_notifications_alerts;
        this.todaynotif[i] = this.logins[i].today_notifications_alerts;
        this.uniquenotif[i] = this.logins[i].unique_notifications_alerts;
        this.totalhelp[i] = this.logins[i].total_help_center;
        this.todayhelp[i] = this.logins[i].today_help_center;
        this.uniquehelp[i] = this.logins[i].unique_help_center;
        this.totalcatdetails[i] = this.logins[i].total_category_details;
        this.todaycatdetails[i] = this.logins[i].today_category_details;
        this.uniquecatdetails[i] = this.logins[i].unique_category_details;
        this.totalarticlefeed[i] = this.logins[i].total_article_feedback;
        this.todayarticlefeed[i] = this.logins[i].today_article_feedback;
        this.uniquearticlefeed[i] = this.logins[i].unique_article_feedback;
        this.totallogout[i] = this.logins[i].total_logout;
        this.todaylogout[i] = this.logins[i].today_logout;
        this.uniquelogout[i] = this.logins[i].unique_logout;
        
        this.labels[i] = i;
        
        this.totalPieUsers = this.logins[i].total_login;
        this.totalNewPieUsers = this.logins[i].today_login;
        this.uniqueLoginUsers = this.logins[i].unique_login;
        this.totalDashboardUsers = this.logins[i].total_dashboard;
        this.todayDashboardUsers = this.logins[i].today_dashboard;
        this.uniqueDashboardUsers = this.logins[i].unique_dashboard;
        this.totalloansUsers = this.logins[i].total_loan_details;
        this.todayloansUsers = this.logins[i].today_loan_details;
        this.uniqueloansUsers = this.logins[i].unique_loan_details;
        this.totalwelcomeUsers = this.logins[i].total_welcome_letter;
        this.todaywelcomeUsers = this.logins[i].today_welcome_letter;
        this.uniquewelcomeUsers = this.logins[i].unique_welcome_letter;
        this.totalnocUsers = this.logins[i].total_noc;
        this.todaynocUsers = this.logins[i].today_noc;
        this.uniquenocUsers = this.logins[i].unique_noc;
        this.totalpaymentSummaryUsers = this.logins[i].total_payment_summary;
        this.todaypaymentSummaryUsers = this.logins[i].today_payment_summary;
        this.uniquepaymentSummaryUsers = this.logins[i].unique_payment_summary;
        this.totaldownloadpaymentUsers = this.logins[i].total_download_payment_summary;
        this.todaydownloadpaymentUsers = this.logins[i].today_download_payment_summary;
        this.uniquedownloadpaymentUsers = this.logins[i].unique_download_payment_summary;
        this.totalblogsUsers = this.logins[i].total_blogs;
        this.todayblogsUsers = this.logins[i].today_blogs;
        this.uniqueblogsUsers = this.logins[i].unique_blogs;
        this.totalblogsdetailsUsers = this.logins[i].total_blog_details;
        this.todayblogsdetailsUsers = this.logins[i].today_blog_details;
        this.uniqueblogsdetailsUsers = this.logins[i].unique_blog_details;
        this.totalticketpageUsers = this.logins[i].total_ticket_creation_page;
        this.todayticketpageUsers = this.logins[i].today_ticket_creation_page;
        this.uniqueticketpageUsers = this.logins[i].unique_ticket_creation_page;
        this.totalticketUsers = this.logins[i].total_tickets_created;
        this.todayticketUsers = this.logins[i].today_tickets_created;
        this.uniqueticketUsers = this.logins[i].unique_tickets_created;
        this.totalfeedbackUsers = this.logins[i].total_feedback;
        this.todayfeedbackUsers = this.logins[i].today_feedback;
        this.uniquefeedbackUsers = this.logins[i].unique_feedback;
        this.totalnotifUsers = this.logins[i].total_notifications_alerts;
        this.todaynotifUsers = this.logins[i].today_notifications_alerts;
        this.uniquenotifUsers = this.logins[i].unique_notifications_alerts;
        this.totalhelpUsers = this.logins[i].total_help_center;
        this.todayhelpUsers = this.logins[i].today_help_center;
        this.uniquehelpUsers = this.logins[i].unique_help_center;
        this.totalcatdetailsUsers = this.logins[i].total_category_details;
        this.todaycatdetailsUsers = this.logins[i].today_category_details;
        this.uniquecatdetailsUsers = this.logins[i].unique_category_details;
        this.totalarticlefeedUsers = this.logins[i].total_article_feedback;
        this.todayarticlefeedUsers = this.logins[i].today_article_feedback;
        this.uniquearticlefeedUsers = this.logins[i].unique_article_feedback;
        this.totallogoutUsers = this.logins[i].total_logout;
        this.todaylogoutUsers = this.logins[i].today_logout;
        this.uniquelogoutUsers = this.logins[i].unique_logout;

        this.totalLoginUsers = this.totalPieUsers;
        this.todayLoginUsers = this.totalNewPieUsers;
      }
      this.loadPieChart();
      this.loadBarCharts();
      this.loadSparkCharts();
    });
  }

  loadPieChart(){
    this.pieChartLabels = ['Today Logins', 'Today Unique Logins'];
    this.pieChartData = [this.todayLoginUsers, this.todayUnique];
    this.pieChartType = 'pie';
    this.pieChartColors = [
      {backgroundColor: ['rgb(21, 101, 192)','rgb(56, 142, 60)'],
       borderColor : ['rgb(57, 55, 55)','rgb(57, 55, 55)']}];
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
    if(this.selectedUser1=="All Users"){
      this.lineChartCondition = [{ data: this.newUsers, label: 'Today Unique Logins' },{ data: this.todayLogin, label: 'Today Logins' }];
    }
    this.lineChartLabels = this.lineGraphDates;
    this.lineChartData = this.lineChartCondition,
    this.lineChartType = 'line';
    this.lineChartLegend = true;
    this.lineChartColors = [
      {backgroundColor : 'rgb(102, 255, 255)',
       borderColor : 'rgb(0, 191, 255),rgb(102, 255, 255)'}];
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
   this.sChartData1 = [{ data: this.totalLogin}]; this.sChartData2 = [{ data: this.todayLogin}]; this.sChartData3 = [{ data: this.uniqueLogin}];
   this.sDashboard1 = [{ data: this.totalDashboard}]; this.sDashboard2 = [{ data: this.todayDashboard}]; this.sDashboard3 = [{ data: this.uniqueDashboard}];
   this.sLoanDetails1 = [{ data: this.totalloans}]; this.sLoanDetails2 = [{ data: this.todayloans}]; this.sLoanDetails3 = [{ data: this.uniqueloans}];
   this.swelcomeLetter1 = [{ data: this.totalwelcome}]; this.swelcomeLetter2 = [{ data: this.todaywelcome}]; this.swelcomeLetter3 = [{ data: this.uniquewelcome}];
   this.snoc1 = [{ data: this.totalnoc}]; this.snoc2 = [{ data: this.todaynoc}]; this.snoc3 = [{ data: this.uniquenoc}];
   this.spaymentsummary1 = [{ data: this.todaypaymentSummary}]; this.spaymentsummary2 = [{ data: this.totalpaymentSummary}]; this.spaymentsummary3 = [{ data: this.uniquepaymentSummary}];
   this.spaymentsummarydown1 = [{ data: this.totaldownloadpayment}]; this.spaymentsummarydown2 = [{ data: this.todaydownloadpayment}]; this.spaymentsummarydown3 = [{ data: this.uniquedownloadpayment}];
   this.stotalblogs1 = [{ data: this.totalblogs}]; this.stotalblogs2 = [{ data: this.todayblogs}]; this.stotalblogs3 = [{ data: this.uniqueblogs}];
   this.stotalblogsdetails1 = [{ data: this.totalblogsdetails}]; this.stotalblogsdetails2 = [{ data: this.todayblogsdetails}]; this.stotalblogsdetails3 = [{ data: this.uniqueblogsdetails}];
   this.sticketPage1 = [{ data: this.totalticketpage}]; this.sticketPage2 = [{ data: this.todayticketpage}]; this.sticketPage3 = [{ data: this.uniqueticketpage}];
   this.sticketCreated1 = [{ data: this.totalticket}]; this.sticketCreated2 = [{ data: this.todayticket}]; this.sticketCreated3 = [{ data: this.uniqueticket}];
   this.sfeedback1 = [{ data: this.totalfeedback}]; this.sfeedback2 = [{ data: this.todayfeedback}]; this.sfeedback3 = [{ data: this.uniquefeedback}];
   this.snotification1 = [{ data: this.totalnotif}]; this.snotification2 = [{ data: this.todaynotif}]; this.snotification3 = [{ data: this.uniquenotif}];
   this.shelpcenter1 = [{ data: this.totalhelp}]; this.shelpcenter2 = [{ data: this.todayhelp}]; this.shelpcenter3 = [{ data: this.uniquehelp}];
   this.scategoryDetails1 = [{ data: this.totalcatdetails}]; this.scategoryDetails2 = [{ data: this.todaycatdetails}]; this.scategoryDetails3 = [{ data: this.uniquecatdetails}];
   this.sarticleFeedback1 = [{ data: this.totalarticlefeed}]; this.sarticleFeedback2 = [{ data: this.todayarticlefeed}]; this.sarticleFeedback3 = [{ data: this.uniquearticlefeed}];
   this.slogouts1 = [{ data: this.totallogout}]; this.slogouts2 = [{ data: this.todaylogout}]; this.slogouts3 = [{ data: this.uniquelogout}];

    this.sChartLabels = this.labels;
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

  itemSelected1(event,value){
    this.selectedUser1 = event;
    if(value == 3){
      this.lineChartCondition = [{ data: this.totalUsers, label: 'TotalUsers' }];
    }
    else if(value == 2){
      this.lineChartCondition = [{ data: this.newUsers, label: 'NewUsers' }];
    }
    else{
        this.lineChartCondition = [{ data: this.newUsers, label: 'NewUsers' },{ data: this.totalUsers, label: 'TotalUsers' }];
    }
    this.loadBarCharts();
  }
  
  itemSelected2(event,value){
    this.selectedUser2 = event;
    if(value == 3){
      this.lineChartCondition = [{ data: this.totalUsers, label: 'TotalUsers' }];
    }
    else if(value == 2){
      this.lineChartCondition = [{ data: this.newUsers, label: 'NewUsers' }];
    }
    else{
        this.lineChartCondition = [{ data: this.newUsers, label: 'NewUsers' },{ data: this.totalUsers, label: 'TotalUsers' }];
    }
    this.loadBarCharts();
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

  downloadExcel(){
    this.csvResp = [];
    var options = {
      title : '',
      fieldSeparator : ',',
      quoteStrings : '"',
      decimalSeparator : '.',
      showLabels : true,
      showTitle : false,
      useBom : true,
      headers : ["Date","Phone","Event Name","Source","Camp_ID"]
    }
    this.formula = 'eventAnalytics';
    this.dataService.downloadExcelCSV().subscribe(res => 
    {
      this.responseForExcel = res;
      for(let i=0 ; i<this.responseForExcel.data.length ; i++){
        this.csvResp[i] = this.responseForExcel.data[i];

        for(let j=0 ; j<this.csvResp[i].length ; j++){
          this.excel[j] = this.csvResp[i][j];
        }
      }
      console.log("Res = ",this.excel,"and=",this.csvResp.length)
      new Angular5Csv(this.excel,this.formula,options);
    });

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
      headers : ["Date","Total Login","Today Login","Today Unique Login","Total Dashboard Visitor","Today Dashboard Visitor",
      "Total Loan Details Visitor","Today Loan Details Visitor","Total Welcome Letter Visitor","Today Welcome letter Visitor",
      "Total NOC Visitor","Today NOC Visitor","Total Payment Summary Visitor","Today Payment Summary Visitor",
      "Total Download Payment Summary Visitor","Today Download Payment Summary Visitor","Total Blogs Visitor",
      "Today Blogs Visitor","Total Blog Details Visitor","Today Blog Details Visitor","Total Ticket Creation - Page Visitor",
      "Today Ticket Creation - Page Visitor","Total Tickets Created","Today Tickets Created","Total Feedback","Today Feedback",
      "Total Notifications & Alerts","Today Notifications & Alerts","Total Help Center","Today Help Center","Total Category Details",
      "Today Category Details","Total Article Feedback","Today Article Feedback","Total Logout","Today Logout"]
    }
    
    this.formula = 'loginAnalytics';
    this.dataService.downloadGraphCSV().subscribe(res => 
    {
      this.responseForCSV = res;
      for(let i=0 ; i<this.responseForCSV.data.length ; i++){
        this.csvResp[i] = this.responseForCSV.data[i];
      }
      new Angular5Csv(this.csvResp,this.formula,options);
    });
  }
}
