import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  allUser: any;
  current_date: any;
  alldiscrepancy: any;
  totalLoan: any;
  userlist: any;
  discrepancyList: any;

  constructor(
    private http: HttpClient,
    private data: DataService,
    private router: Router,
  ) { }



  ngOnInit() {
    // for total user
    this.current_date = new Date();
    this.data.getAllUser().subscribe(res => {
      this.allUser = res
    },
      err => {
        this.allUser = [];
      })

    // for total discrepancy
    this.data.getTotalDiscrepancy().subscribe(res => {
      this.alldiscrepancy = res
    },
      err => {
        this.alldiscrepancy = [];
      })

    // for total loan
    this.data.getTotalLoan().subscribe(res => {
      this.totalLoan = res
    },
      err => {
        this.totalLoan = [];
      })


      // this.data.getAllUserList().subscribe(res =>{
      //   this.userlist = res
      //   localStorage.setItem('customer_details', JSON.stringify(this.userlist.data))
      // },
      // err =>{

      // })

  }


  view_total_loan() {
    this.router.navigate(['/totalLoanDetail'])
  }
  view_total_discrepancy() {
    this.router.navigate(['/totalDiscrepancyDetail'])
  }
  view_total_customer() {
    this.data.getAllUserList().subscribe(res =>{
      // this.userlist = res
      // localStorage.setItem('allCustomerList', JSON.stringify(this.userlist.data))
      this.router.navigate(['/customers']);
    },
    err =>{

    })
    
  }

  isActive: boolean
  routerLinkActiveOptions: {
    exact: boolean;
  }

}
