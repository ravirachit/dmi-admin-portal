import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogdetail',
  templateUrl: './blogdetail.component.html',
  styleUrls: ['./blogdetail.component.scss']
})
export class BlogdetailComponent implements OnInit {
  blogDetail:any;
  description:any;

  constructor(
    public domSanatize: DomSanitizer,
    private router: Router
    ) { }

  ngOnInit() {

    this.blogDetail = JSON.parse(localStorage.getItem('blogDetail')),
    this.description = this.blogDetail[0].blog_description;

  }

}
