import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { SharedataService } from '../sharedata.service';


@Component({
  selector: 'app-user-portal',
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.scss']
})
export class UserPortalComponent implements OnInit {

  userData:any=[];
  page : any = 1;
  pageSize = 10;
  collectionSize : any;
  userResponse:any='';
  id:any;
  userDetails:any={
    id:'',name:'',loan:'',status:''
  };


  constructor(private router: Router, private service: DataService,private shareService: SharedataService) { }

  ngOnInit() {
    this.id = localStorage.getItem('userId');
    this.getList();
  }

  getList(){
    this.service.getUserList(this.page,this.pageSize).subscribe(res=>{
      this.userResponse = res;
      this.userData = this.userResponse.data;
      this.collectionSize = this.userResponse.message.totalpartner;
    });
  }

  loadPage(pagechange:number)
  {
    this.service.getUserList(pagechange,this.pageSize).subscribe(res=>{
      this.userResponse = res;
      this.userData = this.userResponse.data;
    });
  }

  editData(id,name,loanpartnr,status){
    this.userDetails={id:id,name:name,loan:loanpartnr,status:status};
    this.shareService.setUserDetails(this.userDetails);
    localStorage.setItem('state','1');
    this.router.navigate(['add-new-user']);
  }

  addNewPartner(){
    localStorage.setItem('state','0');
    this.router.navigate(['add-new-user']);
  }

  deleteData(userID){
    this.service.deleteUser(userID,this.id).subscribe(res=>{
      if(res){
        this.getList();
      }
    });
  }
}
