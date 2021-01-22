import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  mobile:any='';
  oldpassword:any='';
  newpassword:any='';
  confirmNewpassword:any='';
  userdetails:any=[];

  constructor(private service:DataService) { }

  ngOnInit() {
    this.userdetails = JSON.parse(localStorage.getItem('currentUser'));
    this.mobile = this.userdetails.data.mobile;
  }

  changePassowrd(){
    if(this.newpassword == this.confirmNewpassword){
      this.service.changePassowrd(this.mobile,this.oldpassword,this.newpassword).subscribe(res=>{
        if(res){
          debugger
          Swal.fire({
            title : 'Password Changed',
            text : 'Password Changed Successfully.',
            type : 'success',
            confirmButtonText : 'OK'
          });
        }
      },error=>{
        if(error){
          Swal.fire({
            title : 'Incorrect Old Password',
            text : 'Please Try Again with Correct Password.',
            type : 'warning',
            confirmButtonText : 'OK'
          });
        }
      });
    }
    else{
      alert('New Password and Confirm Password should be same.')
    }
  }

}
