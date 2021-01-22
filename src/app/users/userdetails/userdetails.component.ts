import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';

import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { Employee } from '../employee/employee';
import { EmployeeService } from './customer.service';
import { NgbdSortableHeader, SortEvent } from '../../sortable.directive';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss'],
  providers: [EmployeeService, DecimalPipe]
})
export class UserdetailsComponent implements OnInit {
  userdetails$: any;
  userActivities: any;
  single_user_loan: any;
  user_offer:any;
  user_discrepancy: any;
  employ$: Observable<Employee[]>;
  total$: Observable<number>;


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private http: HttpClient, private data: DataService, private route: ActivatedRoute,
    public service: EmployeeService) {
    this.employ$ = service.countries$;
    this.total$ = service.total$;

    this.route.params.subscribe(params => this.userdetails$ = params.id)
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

  ngOnInit() {
    // get data from localStorage
    this.userdetails$ = JSON.parse(localStorage.getItem('single_user_detail')) || []
    this.userActivities = JSON.parse(localStorage.getItem('single_user_events')) || []
    this.single_user_loan = JSON.parse(localStorage.getItem('single_user_loan')) || []
    this.user_offer = JSON.parse(localStorage.getItem('single_user_offer')) || []
    this.user_discrepancy = JSON.parse(localStorage.getItem('single_user_discrepancy')) || []
  }

}
