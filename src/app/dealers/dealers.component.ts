import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/data.service';

import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';

import {Employee} from '../users/employee/employee';
import {EmployeeService} from '../users/employee/employee.service';
import {NgbdSortableHeader, SortEvent} from '../sortable.directive';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.scss'],
  providers: [EmployeeService, DecimalPipe]
})
export class DealersComponent implements OnInit {

  employ$: Observable<Employee[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;


  constructor(private http: HttpClient, private data: DataService, 
    public service: EmployeeService) {
      this.employ$ = service.countries$;
      this.total$ = service.total$;
     }

     onSort({column, direction}: SortEvent) {
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
  }

}
