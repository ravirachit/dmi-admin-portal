import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-total-discrepancy-detail',
  templateUrl: './total-discrepancy-detail.component.html',
  styleUrls: ['./total-discrepancy-detail.component.scss']
})
export class TotalDiscrepancyDetailComponent implements OnInit {
  total_discrepancy_detail: any;

  constructor(
    private http: HttpClient, private data: DataService,
  ) { }

  ngOnInit() {

    this.data.getDiscrepancyList().subscribe(res => {
      this.total_discrepancy_detail = res
      console.log(this.total_discrepancy_detail);
    },
      err => {

      })

  }

}
