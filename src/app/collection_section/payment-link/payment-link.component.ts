import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-payment-link',
  templateUrl: './payment-link.component.html',
  styleUrls: ['./payment-link.component.scss']
})
export class PaymentLinkComponent implements OnInit {

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

  options:any=[{name:'Mobile',id:1},{name:'Loan Name',id:2}];

  constructor(private service : DataService,public dialog: MatDialog) { }

  ngOnInit() {
    this.service.getAuth().subscribe(res=>{
      this.getAuthResp = res;
      this.getAuthResponse = this.getAuthResp.data;
      localStorage.setItem('backend_accessToken',this.getAuthResponse.access_token),
      localStorage.setItem('backend_url',this.getAuthResponse.instance_url)
    });
  }

  searchData(){
    if(this.searchValue === undefined || this.searchValue == ''){
      Swal.fire('Error', 'Please insert value in input', 'error')
      return;
    }
    else if(this.selectedOptn == 1){
      if(this.searchValue.length<10 || this.searchValue.length > 10 || this.searchValue == ''){
        Swal.fire('Error', 'Please insert valid Phone Number', 'error')
        return;
      }
      this.showLoader=true;
      this.service.searchPayments(this.searchValue).subscribe(res=>{
        this.paymentResp=res;
        this.paymentResponse=this.paymentResp.data;
        this.paymentExist=true;
        
        if(this.paymentResponse.length == 0){
          this.showLoader=true;
          this.service.collectionDataSalesForce(this.searchValue,localStorage.getItem('backend_accessToken'),localStorage.getItem('backend_url')).subscribe(res=>{
            this.salesForceResp = res;
            this.salesForceResponse = this.salesForceResp.data;
            this.paymentExist=false;
            this.showLoader=false;
            if(this.salesForceResp.message == "Accountid not found"){
              Swal.fire('Error', 'AccountID Not Found', 'error');
              return;
            }
          });
        }
      });
    }
    else if(this.selectedOptn == 2){
      if(this.searchValue.length<13 || this.searchValue.length>13 || this.searchValue == ''){
        Swal.fire('Error', 'Please insert valid opportunity name', 'error')
        return;
      }
      this.showLoader=true;
      this.service.searchPaymentsbyopp(this.searchValue).subscribe(res=>{
        this.paymentResp=res;
        this.paymentResponse=this.paymentResp.data;
        this.paymentExist=true;

        if(this.paymentResponse.length == 0){
          this.showLoader=true;
          this.service.searchPaymentsOppID(localStorage.getItem('backend_url'),localStorage.getItem('backend_accessToken'),this.searchValue).subscribe(res=>{
            this.salesForceResp = res;
            this.salesForceResponse = this.salesForceResp.data;
            this.paymentExist=false;
            this.showLoader=false;
          });
        }
      });
    }
    this.showLoader=false;
  }

  sendSMS(){
    this.showLoader=true;
    this.displayDataBase = 'none';
    this.service.sendPaymentSMS(this.userId,this.entered_number).subscribe(res=>{
      if(res){
        Swal.fire({
          title : 'SMS Sent Successfully',
          text : 'SMS have been sent to this number.',
          type : 'success',
          confirmButtonText : 'OK'
        });
        this.showLoader=false;
        this.amountReg=0;
      }
    });
  }

  createLink(){
    this.showLoader=true;
    this.displayLinkDataBase = 'none';
    debugger;
    if(this.selectedOptn == 1)
    {
      this.service.createPaymentLink(this.userId,this.linkPhone,localStorage.getItem('backend_accessToken'),localStorage.getItem('backend_url'),this.amountEntered).subscribe(res=>{
        if(res){
          if(this.selectedOptn == 1){
            this.service.searchPayments(this.searchValue).subscribe(res=>{
              this.paymentResp=res;
              this.paymentResponse=this.paymentResp.data;
            });
          }
          else{
            this.service.searchPaymentsbyopp(this.searchValue).subscribe(res=>{
              this.paymentResp=res;
              this.paymentResponse=this.paymentResp.data;
            });
          }
          this.showLoader=false;
          this.registeredNum=0;
        }
      });
    }
    else if(this.selectedOptn == 2){
      this.service.createPaymentLinkOpp(this.userId,this.loanName,localStorage.getItem('backend_accessToken'),localStorage.getItem('backend_url'),this.amountEntered).subscribe(res=>{
        if(res){
          if(this.selectedOptn == 1){
            this.service.searchPayments(this.searchValue).subscribe(res=>{
              this.paymentResp=res;
              this.paymentResponse=this.paymentResp.data;
            });
          }
          else{
            this.service.searchPaymentsbyopp(this.searchValue).subscribe(res=>{
              this.paymentResp=res;
              this.paymentResponse=this.paymentResp.data;
            });
          }
          this.showLoader=false;
          this.registeredNum=0;
        }
      });
    }
  }

  sendSMSmodal(id,phone){
    this.displayDataBase = 'block';
    this.userId = id;
    this.regNum = phone;
    this.entered_number = this.regNum;
  }
  
  createLinkModal(id,phone,amount,loanName){
    this.displayLinkDataBase = 'block';
    this.userId = id;
    this.linkPhone = phone;
    this.loanName = loanName;
    this.amountEntered = amount;
    this.amount = this.amountEntered;
  }

  checkChange(event){
    if(event==0){
      this.entered_number = this.regNum;
    }else{this.entered_number = '';}
  }

  // SalesForce

  sendSMSSales(){
    this.showLoader=true;
    this.display = 'none';
    this.service.sendPaymentSMS('',this.entered_number).subscribe(res=>{
      if(res){
        Swal.fire({
          title : 'SMS Sent Successfully',
          text : 'SMS have been sent to this number.',
          type : 'success',
          confirmButtonText : 'OK'
        });
        this.showLoader=false;
        this.amountReg=0;
      }
    });
  }

  createLinkSalesForce(){
    this.showLoader=true;
    this.displayLink = 'none';
    debugger;

    if(this.selectedOptn == 1){
      this.service.createPaymentLink('',this.linkPhone,localStorage.getItem('backend_accessToken'),localStorage.getItem('backend_url'),this.amountEntered).subscribe(res=>{
        this.salesResp = res;
        this.salesId = this.salesResp.data;
          if(res){
          this.paymentExist=true;
          Swal.fire({
            title : 'Link Created',
            text : 'Payment Link Created Successfully.',
            type : 'success',
            confirmButtonText : 'OK'
          });
          if(this.selectedOptn == 1){
            this.service.searchPayments(this.searchValue).subscribe(res=>{
              this.paymentResp=res;
              this.paymentResponse=this.paymentResp.data;
            });
          }
          else{
            this.service.searchPaymentsbyopp(this.searchValue).subscribe(res=>{
              this.paymentResp=res;
              this.paymentResponse=this.paymentResp.data;
            });
          }
          this.showLoader=false;
          this.registeredNum=0;
        }
      });
    }
    else if(this.selectedOptn == 2){
      this.service.createPaymentLinkOpp('',this.loanName,localStorage.getItem('backend_accessToken'),localStorage.getItem('backend_url'),this.amountEntered).subscribe(res=>{
        this.salesResp = res;
        this.salesId = this.salesResp.data;
          if(res){
            this.paymentExist=true;
            Swal.fire({
              title : 'Link Created',
              text : 'Payment Link Created Successfully.',
              type : 'success',
              confirmButtonText : 'OK'
            });
            if(this.selectedOptn == 1){
              this.service.searchPayments(this.searchValue).subscribe(res=>{
                this.paymentResp=res;
                this.paymentResponse=this.paymentResp.data;
              });
            }
            else{
              this.service.searchPaymentsbyopp(this.searchValue).subscribe(res=>{
                this.paymentResp=res;
                this.paymentResponse=this.paymentResp.data;
              });
            }
            this.showLoader=false;
            this.registeredNum=0;
          }
        });
    }
  }

  sendSMSmodalSales(phone,mobile){
    this.display = 'block';
    if(phone !== null){this.regNum = phone;}
    if(phone == null){this.regNum = mobile;}
    this.entered_number = this.regNum;
  }

  createLinkModalSales(phone,mobile,amount,loanName){
    this.displayLink = 'block';
    this.loanName=loanName;
    if(phone !== null){this.linkPhone = phone;}
    if(phone == null){this.linkPhone = mobile;}
    this.amountEntered = amount;
    this.amount = this.amountEntered;
  }

  checkChangeLink(event){
    if(event==0){
      this.amountEntered = this.amount;
    }else{this.amountEntered = '';}
  }

  cancel(){
    this.displayDataBase='none';
    this.displayLinkDataBase='none';
    this.display='none';
    this.displayLink='none';
  }

}
