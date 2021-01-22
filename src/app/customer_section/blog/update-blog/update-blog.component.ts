
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.scss']
})
export class UpdateBlogComponent implements OnInit {
  htmlContent: any;
  BlogTitle: any;
  metaName: any;
  metaTitle: any;
  metaDescription: any;
  event: any;
  updateblogParams: any;
  fileToUpload: any;
  uploadImgFile: any;
  imagePath: any;
  profilePicSet: Boolean = false;
  blogDetail: any;
  imageData: any;
  selectedStatus:any;
  blogId:any;
  activeCategory:any;
  sortDesc:any;
  selectedCategory:any;
  tag:any;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '40vh',
    maxHeight: '40vh',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    toolbarPosition: 'top',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  statusOption = [{ name: "Active", code:"1" }, { name: "In-active", code:'2' }];

  constructor(
    private fb: FormBuilder,
    public domSanatize: DomSanitizer,
    private data: DataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.data.getActiveCategoryList().subscribe(res=>{
      this.activeCategory = res;
    })

    this.blogDetail = JSON.parse(localStorage.getItem('updateblogdetail')),
      console.log(this.blogDetail);

    this.BlogTitle = this.blogDetail[0].blog_title
    this.htmlContent = this.blogDetail[0].blog_description
    this.metaName = this.blogDetail[0].meta_site_name
    this.metaTitle = this.blogDetail[0].meta_title
    this.metaDescription = this.blogDetail[0].meta_description
    this.imageData = this.blogDetail[0].meta_image
    this.selectedStatus = "Active"
    this.blogId = this.blogDetail[0].id
    this.tag = this.blogDetail[0].tags
    this.selectedCategory = this.blogDetail[0].blog_category
    this.sortDesc = this.blogDetail[0].sort_description

  }

  getProfilePic(evt) {
    if (evt.target.files[0]['type'].includes('image')) {
      this.uploadImgFile = evt.target.files[0].name
      this.profilePicSet = false;
      this.getBase64(evt.target.files[0], (base64Data) => {
        this.imageData = base64Data;
        this.profilePicSet = true;
      })
    }
  }

  changeStatus(event) {
    this.selectedStatus = event
  }

  updateBlog() {
    this.updateblogParams = {
      id:this.blogId,
      meta_name: this.metaName,
      meta_title: this.metaTitle,
      meta_description: this.metaDescription,
      meta_image: this.imageData,
      blog_title: this.BlogTitle,
      blog_description: this.htmlContent,
      status: this.selectedStatus,
      created_by: localStorage.getItem('id'),
      phone: localStorage.getItem('phone'),
      sort_description:this.sortDesc,
      blog_category:this.selectedCategory,
      tags:this.tag
    }
    this.data.updateBlogDetails(this.updateblogParams).subscribe(res => {
      console.log(res);
      this.router.navigate(['blog'])
    })
  }

  getBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  }

}

