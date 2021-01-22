import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  paginationData: any;
  page = 1;
  pageSize = 9;
  collectionSize: any;
  blogData:any;
  staticPage:any;
  blogDetailsData:any;

  constructor(
    private data: DataService,
    private router: Router,
    public domSanatize: DomSanitizer,
  ) { }

  ngOnInit() {
    this.staticPage = '1'
    this.data.getBlogList(this.staticPage).subscribe(res => {
      this.blogData = res;
      console.log(res);
    })

    this.data.getPagination().subscribe(res => {
      this.paginationData = res;
      this.collectionSize = this.paginationData.data.totalblog;
      console.log("collection = ",this.collectionSize)
    })
  }

  getPageSymbol(current: number) {
    return this.collectionSize[current - 1];
  }

  loadPage(page: number) {
    this.data.getBlogList(page).subscribe(res => {
      this.blogData = res;
      console.log(res);
    })
  }

  blogDetail(blog){
    this.data.getBlogDetails(blog.id).subscribe(res =>{
      this.blogDetailsData = res;
      localStorage.setItem('blogDetail', JSON.stringify(this.blogDetailsData.data))
      console.log(res)
      this.router.navigate(['blogdetail'])
    })
  }

  updateBlog(blog){
    this.data.getBlogDetails(blog.id).subscribe(res =>{
      this.blogDetailsData = res;
      localStorage.setItem('updateblogdetail', JSON.stringify(this.blogDetailsData.data))
      console.log(res)
      this.router.navigate(['updateblog'])
    })
  }

  deleteBlog(blog){
    this.data.deleteBlogItem(blog.id,localStorage.getItem('phone'),localStorage.getItem('id')).subscribe(res=>{
      console.log(res);
      this.router.navigateByUrl('blog');
    })
  }


}
