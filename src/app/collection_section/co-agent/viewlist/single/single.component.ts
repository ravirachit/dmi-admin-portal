import { Component, OnInit } from '@angular/core';
import { SharedataService } from 'src/app/sharedata.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {

  userId: any;
  listId: any;
  showSingleData : any;
  response : any;

  constructor(private service: SharedataService,private data:DataService) { }

  ngOnInit() {
    this.userId = this.service.getListId();
    this.listId = localStorage.getItem('Id');
    this.getSingleUserList();
  }

  getSingleUserList(){
    this.data.collectionSingleUser(this.listId,this.userId).subscribe(res=>{
      this.response = res;
      this.showSingleData = this.response.data[0];
    });

    this.data.collectionSingleUserLog(localStorage.getItem('SelectedPhone')).subscribe(res=>{
      
    });
  }
}
