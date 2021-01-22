import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryList:any;

  constructor(private data:DataService) { }

  ngOnInit() {
    this.data.getCategoryList().subscribe(res=>{
      this.categoryList = res;
      console.log(this.categoryList);
    })
  }

}
