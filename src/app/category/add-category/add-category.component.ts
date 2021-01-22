import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  categoryName:any;


  constructor(private data:DataService,
    private router:Router) { }

  ngOnInit() {
   
  }

  addCategory(){
    this.data.createCategory(this.categoryName,localStorage.getItem('id'),localStorage.getItem('phone')).subscribe(res=>{
      console.log(res);
      this.router.navigate(['categorylist'])
    })
  }

  
}
