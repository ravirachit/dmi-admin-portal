import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-total-loan-detail',
  templateUrl: './total-loan-detail.component.html',
  styleUrls: ['./total-loan-detail.component.scss']
})
export class TotalLoanDetailComponent implements OnInit {
  total_loan_detail: any;

  constructor(
    private http: HttpClient, private data: DataService,
  ) { }

  ngOnInit() {

    this.data.getTotalLoanList().subscribe(res => {
      this.total_loan_detail = res
    },
      err => {

      })

  }


}
