import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {Employee} from '../employee/employee';
import {EMPLOY} from '../employee/employee-list';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortDirection} from '../../sortable.directive';
import { DataService } from '../../data.service';





interface SearchResult {
  employ: Employee[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(employ: Employee[], column: string, direction: string): Employee[] {
  if (direction === '') {
    return employ;
  } else {
    return [...employ].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(Employee: Employee, term: string, pipe: PipeTransform) {
  return Employee.name.toLowerCase().includes(term)
    //|| pipe.transform(Employee.email).includes(term)
   // || pipe.transform(Employee.created).includes(term);
}

@Injectable({providedIn: 'root'})
export class EmployeeService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private employ$ = new BehaviorSubject<Employee[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  

  private _state: State = {
    page: 1,
    pageSize: 6,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe, private data : DataService) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this.employ$.next(result.employ);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get countries$() { return this.employ$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let employ = sort(EMPLOY, sortColumn, sortDirection);

    // 2. filter
    employ = employ.filter(Employee => matches(Employee, searchTerm, this.pipe));
    const total = employ.length;

    // 3. paginate
    employ = employ.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({employ, total});
  }
}
