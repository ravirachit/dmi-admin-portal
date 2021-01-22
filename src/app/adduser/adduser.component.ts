import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
  UserType = 'Select User Type';
  admin() {
    this.UserType = 'Admin';
  }
  employee() {
    this.UserType = 'Employee';
  }
  
  vendor() {
    this.UserType = 'Vendor';
  }
  
  customer() {
    this.UserType = 'Customer';
  }
  
  
  
  
}
