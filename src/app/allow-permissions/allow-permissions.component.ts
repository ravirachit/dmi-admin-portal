import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allow-permissions',
  templateUrl: './allow-permissions.component.html',
  styleUrls: ['./allow-permissions.component.scss']
})
export class AllowPermissionsComponent implements OnInit {

  roles:Array<any>=[
    {roleName:'Collection',role_id: 2},
    {roleName:'X-Sell',role_id: 3},
    {roleName:'E-Mandate',role_id: 4},
    {roleName:'Customer Portal',role_id: 5}
  ];
  selectedRole:any = '';
  chckdDashboard:boolean=false;
  chckdBlogs:boolean=false;
  chckdNotif:boolean=false;

  showDashDetail:boolean=false;
  showBlogDetail:boolean=false;
  showNotifDetail:boolean=false;

  constructor() { }

  ngOnInit() {
    this.selectedRole = 'Collection';
  }

  roleSelected(role){
    for(let i=0;i<this.roles.length;i++){
      if(role == this.roles[i].role_id)
      this.selectedRole = this.roles[i].roleName;
    }
  }

  dashboardClicked(event){
    this.chckdDashboard = event.target.checked;
    if(this.chckdDashboard==true){
      this.showDashDetail=true;
    }
    else{this.showDashDetail=false;}
  }

  blogsClicked(event){
    this.chckdBlogs = event.target.checked;
    if(this.chckdBlogs==true){
      this.showBlogDetail=true;
    }
    else{this.showBlogDetail=false;}
  }

  notifClicked(event){
    this.chckdNotif = event.target.checked;
    if(this.chckdNotif==true){
      this.showNotifDetail=true;
    }
    else{this.showNotifDetail=false;}
  }

  addUsertoList(){
    
  }

}
