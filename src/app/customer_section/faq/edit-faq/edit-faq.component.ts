import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.scss']
})
export class EditFaqComponent implements OnInit {
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '32vh',
    maxHeight: '32vh',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    toolbarPosition: 'top',
    defaultFontName: 'Arial',
    customClasses:[
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
  faqQuestion:any;
  faqAnswer:any;
  faqdetailData:any;
  faqDetailId:any;
  status = 'active'

  constructor(private data:DataService,
    private router:Router) { }

  ngOnInit() {
    this.faqdetailData = JSON.parse(localStorage.getItem('faqdetail'));
    this.faqQuestion = this.faqdetailData[0].question;
    this.faqAnswer = this.faqdetailData[0].answer;
    this.faqDetailId = this.faqdetailData[0].id;

  }

  updateFAQ(){
    this.data.editFaqdata(this.faqDetailId,this.faqQuestion,this.faqAnswer,this.status,localStorage.getItem('id'),localStorage.getItem('phone')).subscribe(res =>{
      console.log(res)
      this.router.navigate(['faqlist'])
    })
  }

}
