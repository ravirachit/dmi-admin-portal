import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { SharedataService } from '../../sharedata.service';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {

  loanCompanies:any=[];
  loanResponse:any='';
  checkedValues:any=[];
  addresp:any='';
  selectedLoans:any='';

  values:any='';
  checked123:boolean=false;
  id:any;
  userDetails:any={};
  state:any='';
  userName:any='';userEmail:any='';userPhone:any='';userPass:any='';
  editName:any='';
  selectValue:any='';
  partnerStatus:any='';
  selectedOptn:any;
  selVal:boolean=false;
  selectedPartnr:any='';

  partnStatus:any=[
    {name: 'In-active' , id: 0},
    {name: 'Active' , id: 1}
  ]
  
  constructor(private service: DataService,private route: Router, private shareService: SharedataService) { }

  ngOnInit() {
    this.userDetails=this.shareService.getUserDetails();
    this.state = localStorage.getItem('state');
    this.id = localStorage.getItem('userId');
    this.editName=this.userDetails.name;
    this.selectValue=this.userDetails.status;
    this.partnerStatus = this.selectValue;
    this.selectedPartnr=this.userDetails.loan;
    this.getLoanLists();
  }

  getLoanLists(){
    this.service.getPartnerActiveList().subscribe(res=>{
      this.loanResponse=res;
      this.loanCompanies=this.loanResponse.data;
      for(let i=0;i<this.loanCompanies.length;i++){
        if(this.selectedPartnr == this.loanCompanies[i].name){
          this.selectedLoans = this.loanCompanies[i].name;
        }
      }
    });
  }

  onChange(data){
    let index = this.checkedValues.indexOf(data);
    if(index === -1){
      this.checkedValues.push(data);
    }else{
      this.checkedValues.splice(index,1);
    }
  }

  addNewUser(){
    if(this.userName=='' || this.userEmail=='' || this.userPhone=='' || this.userPass=='' || this.selectedLoans== ''){
      alert("Please Enter Complete Details.")
    }
    else{
      this.service.createUser(this.userName,this.userPhone,this.selectedLoans,this.userEmail,this.userPass,this.id).subscribe(res=>{
        if(res){
          this.addresp=res;
          this.route.navigate(['user-portal']);
        }
      });
    }
  }

  changedLoan(event){
    let selLoan = event;
    for(let i=0;i<this.loanCompanies.length;i++){
      if(selLoan == this.loanCompanies[i].name){
        this.selectedLoans = this.loanCompanies[i].name;
      }
    }
  }

  editUserDetails(){
    let slectedValues;
    if(this.selVal==true){
      slectedValues = this.selectedOptn;
    }
    else if(this.selVal==false){
      for(let i=0;i<this.partnStatus.length;i++){
        if(this.partnStatus[i].name == this.partnerStatus){
          this.selectValue = this.partnStatus[i].name;
          this.selectedOptn = this.partnStatus[i].id;
          slectedValues=this.selectedOptn;
        }
      }
    }
    if(this.editName==''){
      alert("Please Enter Complete Details.")
    }
    else{
      this.service.getUserUpdate(this.userDetails.id,this.userDetails.name,this.selectedLoans,slectedValues,this.id).subscribe(res=>{
        if(res){
          this.addresp=res;
          this.route.navigate(['user-portal']);
        }
     });
    }
  }

  changedValue(value){
    this.selVal=true;
    if(value == this.partnStatus[1].name){
      this.selectValue = this.partnStatus[1].name;
      this.selectedOptn = 1;
    }
    else if(value == this.partnStatus[0].name){
      this.selectValue = this.partnStatus[0].name;
      this.selectedOptn = 0;
    }
  }

}
