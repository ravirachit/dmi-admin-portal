import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.scss']
})
export class AddblogComponent implements OnInit {
  model: any = {};
  htmlContent: any;
  BlogTitle: any;
  metaName: any;
  metaTitle: any;
  metaDescription: any;
  event: any;
  addblogParams:any;
  fileToUpload:any;
  uploadImgFile:any;
  selectedCategory:any;
  tag:any;
  sortDesc:any;
  imagePath:any;
  activeCategory:any;
  profilePicSet: Boolean = false;
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

  constructor(
    private fb: FormBuilder,
    private data: DataService,
    public domSanatize: DomSanitizer,
    private router: Router,
  ) { }

  ngOnInit() {
    this.data.getActiveCategoryList().subscribe(res=>{
      this.activeCategory = res;
      console.log(this.activeCategory)
    })
  }

  getProfilePic(evt) {
    if (evt.target.files[0]['type'].includes('image')) {
      this.uploadImgFile = evt.target.files[0].name
      this.profilePicSet = false;
      this.getBase64(evt.target.files[0], (base64Data) => {
        this.imagePath = base64Data;
        this.profilePicSet = true;
      })
    } 
  }

  proceed() {
    this.addblogParams = {
      blog_title:this.BlogTitle,
      blog_description:this.htmlContent,
      created_by:localStorage.getItem('id'),
      phone:localStorage.getItem('phone'),
      meta_title:this.metaTitle,
      meta_name:this.metaName,
      meta_description:this.metaDescription,
      meta_image:this.imagePath,
      sort_description:this.sortDesc,
      blog_category:this.selectedCategory,
      tags:this.tag
    }
console.log(this.addblogParams);
    this.data.addblogs(this.addblogParams).subscribe(res => {
      console.log(res);
      this.router.navigate(['blog'])
    })

  }
  strLenght(str){
    console.log(str)
  }

  getBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  }

}
