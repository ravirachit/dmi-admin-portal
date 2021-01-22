import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../data.service';
import {SharedataService} from '../../../../sharedata.service';
import Swal from 'sweetalert2';


import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addnew-user',
  templateUrl: './addnew-user.component.html',
  styleUrls: ['./addnew-user.component.scss']
})
export class AddnewUserComponent implements OnInit
{
  user_name : any;
  user_email : any;
  user_phone : any;
  user_amount : any;
  user_loan_id : any;
  user_date : any;

  admin_phone :any;
  created_by :any;
  collection_id : any;

  response : any;
  phone : any;

  show: any
  event: any;
  // maxDate: Date;
  model: any = {};
  id:any;


  constructor(private fb: FormBuilder,
    private router: Router, private service : DataService,public shareData : SharedataService) 
  {
    this.collection_id = localStorage.getItem('Id');
  }
  
  ngOnInit()
  { 
    this.phone = localStorage.getItem('phone');
    this.admin_phone = this.phone;
    this.created_by = '1';

  // this.maxDate = new Date();
  // this.maxDate.setDate(this.maxDate.getDate() - 365 * 18);

  }

  changeEvent(event){
    let enteredValue = this.model.user_phone = event.replace(/[^0-9]*/g, '');
    this.model.user_phone = enteredValue;
  }

  addUsertoList()
  {
    this.service.collectionAddUser(this.admin_phone,this.created_by,this.collection_id,this.model.user_name,this.model.user_email,this.model.user_phone,this.model.user_amount,this.model.user_loan_id,this.model.user_date).subscribe(res=>
    {
      this.response = res;
      let status = this.response.status;

      if(status==200)
      {
        Swal.fire({
          title : 'User Added Successfully',
          text : 'New User Added to your Collection List',
          type : 'success',
          confirmButtonText : 'OK'
        });
        this.router.navigate(['/viewdetails']);
      }
    });
  }
  

  onSubmit() {
    //this.router.navigate(['/viewdetails']);
    console.log("Done");
  }

}
