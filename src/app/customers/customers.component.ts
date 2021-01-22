
import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

import { Router, ActivatedRoute } from '@angular/router';

import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { Customer } from './customers';
import { CustomerService } from './customer.service';
import { NgbdSortableHeader, SortEvent } from '../sortable.directive';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [CustomerService, DecimalPipe]
})
export class CustomersComponent implements OnInit {
  employ$: Observable<Customer[]>;
  total$: Observable<number>;
  userDetails: any;
  single_user_phone: any;
  single_user_loan: any;
  user_events: any;
  user_offer: any;
  user_discrepancy:any;
  phoneValue: any;
  customerResp:any;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private http: HttpClient, private data: DataService, private router: Router,
    public service: CustomerService) {
    this.employ$ = service.countries$;
    this.total$ = service.total$;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    //   this.service.sortDirection = direction;
  }

  users: Object;
  ngOnInit() {
    this.getCustomers();
    JSON.parse(localStorage.getItem('allCustomerList')) || [];
    console.log("Data = ",JSON.parse(localStorage.getItem('allCustomerList')))
  }

  isActive: boolean
  routerLinkActiveOptions: {
    exact: 'employee';
  }

  getCustomers(){
    this.data.getAllUserList().subscribe(res =>{
      this.customerResp = res
      localStorage.setItem('allCustomerList', JSON.stringify(this.customerResp.data))
    });
  }

  goToUserDetails(phone) {
    this.single_user_phone = { phone: phone }
    this.data.getUserDetails(this.single_user_phone).subscribe(res => {
      this.userDetails = res
      localStorage.setItem('single_user_detail', JSON.stringify(this.userDetails.data))
      this.phoneValue = localStorage.setItem('single_user_phone', JSON.stringify(this.single_user_phone))
   
      this.data.getSingleUserEvent(this.single_user_phone).subscribe(res => {
        this.user_events = res
        localStorage.setItem('single_user_events', JSON.stringify(this.user_events.data))
      },
        err => {
  
        })

        this.data.getSingleUserLoans(this.single_user_phone).subscribe(res => {
          this.single_user_loan = res
          localStorage.setItem('single_user_loan', JSON.stringify(this.single_user_loan.data))
        })
    
        this.data.getSingleUserOffer(this.single_user_phone).subscribe(res => {
          this.user_offer = res
          localStorage.setItem('single_user_offer', JSON.stringify(this.user_offer.data))
        })
    
        this.data.getSingleUserDiscrepancy(this.single_user_phone).subscribe(res => {
          this.user_discrepancy = res
          localStorage.setItem('single_user_discrepancy', JSON.stringify(this.user_discrepancy.data))
          this.router.navigate(['userdetails'])
        })
   
   
    },
      err => {

      })

  }


}
