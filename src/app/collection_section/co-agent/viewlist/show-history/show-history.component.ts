import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../data.service';
import {SharedataService} from '../../../../sharedata.service';

@Component({
  selector: 'app-show-history',
  templateUrl: './show-history.component.html',
  styleUrls: ['./show-history.component.scss']
})
export class ShowHistoryComponent implements OnInit {

  id : any;
  historyList: any;
  logsList: any;

  constructor(private data: DataService,public shareData : SharedataService) {
    this.id=localStorage.getItem('Id');
   }

  ngOnInit() {
    this.logHistory();
  }

  logHistory(){
    this.data.collectionLog(this.id).subscribe(res=>{
      this.historyList = res;
      this.logsList = this.historyList.data;
    });
  }

}
