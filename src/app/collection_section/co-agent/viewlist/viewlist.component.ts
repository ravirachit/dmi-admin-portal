import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { SharedataService } from '../../../sharedata.service';

@Component({
  selector: 'app-viewlist',
  templateUrl: './viewlist.component.html',
  styleUrls: ['./viewlist.component.scss']
})
export class ViewlistComponent implements OnInit
{
  phone : any='';
  created : any = 1;
  
  page : any = 1;
  pageSize = 9;
  viewData: any;
  message : any;
  collectionSize : any;
  viewlist : any = [];
  isActive: boolean;

  constructor(private service : DataService,private shareData : SharedataService) { }

  ngOnInit() {
    this.phone = localStorage.getItem('phone');

    this.service.getCollectionFile(this.phone,this.created,this.page,this.pageSize).subscribe(res=>
    {  
      this.viewData = res;
      this.viewlist = this.viewData.data;
      this.collectionSize = this.viewData.message.totalcollectionfile;
    });
  }

  sendId(event,listName)
  {
    localStorage.setItem('Id',event);
    localStorage.setItem('listName',listName);
    // this.shareData.setId(event);
  }

  loadPage(pagechange:number)
  {
    this.service.getCollectionFile(this.phone,this.created,pagechange,this.pageSize).subscribe( res =>
    {
      this.viewData = res;
      this.viewlist = this.viewData.data;
    });
  }

}
