import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  pageno:any;
  faqlist:any;
  public isCollapsed: boolean[] = [true];
  paginationData: any;
  page = 1;
  pageSize = 10;
  collectionSize: any;
  staticPage:any;
  faqDetails:any;

  activeIds: string[] = [];

  constructor(private data: DataService,
    private router:Router) { }

  ngOnInit() {
    this.staticPage = '1'
    this.data.getFaqList(this.staticPage).subscribe(res =>{
      this.faqlist = res;
    })

    this.data.getFaqpaginationList().subscribe(res => {
      console.log(res);
      this.paginationData = res;
      this.collectionSize = this.paginationData.data.totalfaq;
    })

  }

  loadPage(page: number) {
    this.data.getFaqList(page).subscribe(res => {
      this.faqlist = res;
    })
  }

  updateFAQ(faq){
    this.data.getSpecificFaqList(faq.id).subscribe(res=>{
      this.faqDetails = res;
      localStorage.setItem('faqdetail', JSON.stringify(this.faqDetails.data))
      this.router.navigate(['editfaq'])
    })
  }

  deleteFAQ(faq){
    this.data.deleteFAQdata(faq.id,localStorage.getItem('phone'),localStorage.getItem('id')).subscribe(res =>{
      console.log(res);
    })
  }

}
