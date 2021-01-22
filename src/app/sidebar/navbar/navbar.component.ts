import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { Observable } from 'rxjs';
import {SharedataService} from '../../sharedata.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  //isLoggedIn$: Observable<boolean>;
  role_id : any='';
  showAdmin:boolean=false;
  showXSell:boolean=false;
  showEMandate:boolean=false;
  showCustomers:boolean=false;
  showCollection : boolean = false;

  constructor(private authService: AuthService,private service : SharedataService,private route : Router) { }

  ngOnInit() {
  //  this.isLoggedIn$ = this.authService.isLoggedIn;
  this.role_id = localStorage.getItem('role_id');

  if(this.role_id == 1){
    this.showAdmin = true;
  }
  else if(this.role_id == 2){
    this.showEMandate = true;
  }
  else if(this.role_id == 3){
    this.showXSell = true;
  }
  else if(this.role_id == 4){
    this.showCustomers = true;
  }
  else if(this.role_id == 5 || this.role_id == 8 || this.role_id == 9){
    this.showCollection = true;
  }
 
}

  // onLogout() {
  //   this.authService.logout();
  // }
  isCollapsed = false;
  isCollapsedCust = false;
}
