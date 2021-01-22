import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-paylink',
  templateUrl: './paylink.component.html',
  styleUrls: ['./paylink.component.scss']
})
export class PaylinkComponent implements OnInit {

  searchValue:any='';
  paymentResp:any='';
  createdNewLink:any='';
  newLinkCreate:any='';
  getAuthResp:any='';
  salesForceResp:any='';
  salesId:any='';
  salesResp:any='';
  userId:any='';
  listId:any='';
  registeredNum:any='';
  entered_number:any='';
  regNum:any='';
  amountReg:any='';
  amountEntered:any='';
  amount:any='';
  linkPhone:any='';
  loanName:any='';
  selectedOptn:any=1;

  newLink:any=[];
  salesResponse:any=[];
  getAuthResponse:any=[];
  paymentResponse:any=[];
  salesForceResponse:any=[];

  display = 'none';
  displayLink = 'none';
  displayDataBase = 'none';
  displayLinkDataBase = 'none';

  showLoader:boolean = false;
  paymentExist:boolean=false;
  showOtherOption:boolean=false;
  total_outstanding_amount:any;

  options:any=[{name:'Mobile',id:1},{name:'Loan Name',id:2}];

  constructor(private router: Router,
    private route: ActivatedRoute,private service : DataService,public dialog: MatDialog) { }

  ngOnInit() {
    localStorage.removeItem('history_loan_name');
    this.service.getAuth().subscribe(res=>{
      this.getAuthResp = res;
      this.getAuthResponse = this.getAuthResp.data;
      localStorage.setItem('backend_accessToken',this.getAuthResponse.access_token),
      localStorage.setItem('backend_url',this.getAuthResponse.instance_url)
    });

  }

  searchData(){      
   

    if(this.searchValue === undefined || this.searchValue == ''){
      this.salesForceResponse='';
      Swal.fire('Error', 'Please insert value in input', 'error')
      return;
    }
    else if(this.selectedOptn == 1){
      if(this.searchValue.length<10 || this.searchValue.length > 10 || this.searchValue == ''){
        this.salesForceResponse='';
        Swal.fire('Error', 'Please insert valid Phone Number', 'error')
        return;
      }
     
      this.showLoader=true;
      this.salesForceResponse='';
        
          this.service.SearchBYPhoneCM(this.searchValue,localStorage.getItem('backend_accessToken'),localStorage.getItem('backend_url')).subscribe(res=>{
            this.salesForceResp = res;
            if(this.salesForceResp.message == "Accountid not found") 
            {
              this.showLoader = false;
              Swal.fire('Error', 'AccountID Not Found', 'error');
              return;
            }
            else {
            this.salesForceResponse = this.salesForceResp.data;
            this.showLoader = false;
            }
            
          
           
          
          });
        
     
    }
    else if(this.selectedOptn == 2){
      if(this.searchValue.length<13 || this.searchValue.length>13 || this.searchValue == ''){
        Swal.fire('Error', 'Please insert valid opportunity name', 'error')
        return;
      }
      this.showLoader=true;
      this.salesForceResponse='';

       
          this.showLoader=true;
          this.service.SearchBYOppCM(this.searchValue,localStorage.getItem('backend_accessToken'),localStorage.getItem('backend_url')).subscribe(res=>{
            this.salesForceResp = res;
            if(this.salesForceResp.data == "") 
            {
              this.showLoader = false;
              Swal.fire('Error', 'Not Found', 'error');
              return;
            }
            else {
            this.salesForceResponse = this.salesForceResp.data;
            this.showLoader = false;
            }
          });
        
      
    }
  }

  sendSMS(payamount, smsphone, firstname, lastname, email, outstanding_amount, due_date,loan_name,mobile,emi_amount){
    var name =  firstname + ' ' + lastname 
    this.showLoader=true;
    this.service.SendFinalSMS(name,email,smsphone,payamount,outstanding_amount,due_date,loan_name,mobile,emi_amount,localStorage.getItem('phone')).subscribe(res=>{
      if(res){
        Swal.fire({
          title : 'SMS Sent Successfully',
          text : 'SMS have been sent to this number.',
          type : 'success',
          confirmButtonText : 'OK'
        });
        this.showLoader=false;
       
      }
    });
  }

  checklog(loan_name){
    localStorage.setItem('history_loan_name',loan_name)
   
    this.router.navigate(['/history'])
  }

  

}
