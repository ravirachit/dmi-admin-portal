import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  salesForceResp:any;
  showLoader:boolean=false;
  salesForceResponse:any;
  constructor(private service : DataService) { }

  ngOnInit() {
    this.showLoader = true;
    this.service.HistoryByopp(localStorage.getItem('history_loan_name')).subscribe(res=>{
      this.salesForceResp = res;
      
      this.salesForceResponse = this.salesForceResp.data;
      this.showLoader = false;
      
      
    
     
    
    });

  }

}
