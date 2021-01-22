import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFaqComponent implements OnInit {
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
  faqQuestion:any;
  faqAnswer:any;

  constructor(private data: DataService,
    private router: Router) { }

  ngOnInit() {
  }

  addFAQ(){
    this.data.addFaqdata(this.faqQuestion,this.faqAnswer,localStorage.getItem('id'),localStorage.getItem('phone')).subscribe(res=>{
      this.router.navigate(['faqlist']);
    })
  }

}






