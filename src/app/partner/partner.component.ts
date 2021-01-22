import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit {

  showAdd:boolean=false;
  tktimgset: boolean = false;
  filetoUpload : Array<File> = [];
  fileName:string="Please Select Image";
  attachFile : any = 'assets/attachment-icon.svg';

  tktimgUpdate: boolean=false;
  filetoUploadEdit : Array<File> = [];
  fileNameUpdate:string='';
  attachFileUpdate:any = '';

  page : any = 1;
  pageSize = 10;
  collectionSize : any;
  partnerData:any=[];
  partnerResp:any;
  partnerName:any='';
  partnerStatus:any='';
  partnerUpdateName:any='';
  id:any;
  seletID:any='';
  editBox:boolean=false;
  selectValue:any='';
  selectedOptn:any;

  partnStatus:any=[
    {name: 'In-active' , id: 0},
    {name: 'Active' , id: 1}
  ]

  // baseurl = "https://dmi.vistaconnect.com/dmi-clubbed-backend/api/"

  // production Url
  baseurl = "https://los.dmifinance.in/los/api/"

  constructor(private service: DataService , private http: HttpClient) { }

  ngOnInit() {
    this.id = localStorage.getItem('userId');
    this.getList();
  }

  getList(){
    this.service.loanPartnerList(this.page,this.pageSize).subscribe(res=>{
      this.partnerResp=res;
      this.partnerData=this.partnerResp.data;
      this.collectionSize = this.partnerResp.message.totalloanpartner;
    })
  }

  addNewPartner(){
    this.showAdd = !this.showAdd;
  }

  getProfilePic(element) {
    this.filetoUpload = element.target.files;
    if(this.filetoUpload!=[])
    {
      this.fileName = this.filetoUpload[0].name;
      const fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL(this.filetoUpload[0]);
      fileReader.onload = (event:Event) => 
      { this.attachFile = fileReader.result; }
    }
    else{
      alert("Please Select Partner's Image");
    }
  }

  getProfilePicUpdate(element) {
    this.filetoUploadEdit = element.target.files;
    if(this.filetoUploadEdit!=[])
    {
      this.fileNameUpdate = this.filetoUploadEdit[0].name;
      const fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL(this.filetoUploadEdit[0]);
      fileReader.onload = (event:Event) => 
      { this.attachFileUpdate = fileReader.result; }
    }
    else{
      alert("Please Select Partner's Image");
    }
  }

  loadPage(pagechange:number)
  {
    this.service.loanPartnerList(pagechange,this.pageSize).subscribe(res=>{
      this.partnerResp=res;
      this.partnerData=this.partnerResp.data;
    });
  }

  addPartner(){
    this.fileName = '';
    let formData = new FormData();
    for(let i=0;i<this.filetoUpload.length;i++)
    {
      formData.append("name",this.partnerName);
      formData.append("image",this.filetoUpload[i],this.filetoUpload[i].name);
      formData.append("created_by",this.id);
    }
    this.http.post(this.baseurl + 'createloanpartner', formData).subscribe((response) =>
    {
      if(response){
        this.partnerName = '';
        this.fileName = '';
        this.attachFile = 'assets/attachment-icon.svg';
        this.filetoUpload = [];
        this.showAdd=false;
      }
      this.getList();
    });
  }

  editData(selectedID,name,status,image){
    this.selectValue='';
    this.editBox = true;
    this.seletID=selectedID;
    this.partnerUpdateName = name;
    this.partnerStatus = status;
    this.attachFileUpdate = image;
    for(let i=0;i<this.partnStatus.length;i++){
      if(this.partnStatus[i].name == this.partnerStatus){
        this.selectValue = this.partnStatus[i].name;
        this.selectedOptn = this.partnStatus[i].id;
      }
    }
  }

  updateData(){
    let form = new FormData();
    if(this.filetoUploadEdit.length == 0)
    {
      this.filetoUploadEdit[0]=this.attachFileUpdate;
      for(let i=0;i<this.filetoUploadEdit.length;i++){
        form.append('id',this.seletID);
        form.append('name',this.partnerUpdateName);
        form.append('status',this.selectedOptn);
        form.append('created_by',this.id);
        form.append('image',this.filetoUploadEdit[i]);
      }
    }
    else{
      for(let i=0;i<this.filetoUploadEdit.length;i++){
        form.append('id',this.seletID);
        form.append('name',this.partnerUpdateName);
        form.append('status',this.selectedOptn);
        form.append('created_by',this.id);
        form.append('image',this.filetoUploadEdit[i],this.filetoUploadEdit[i].name);
      }
    }
    this.http.post(this.baseurl + 'loanpartnerupdate' , form).subscribe(res=>{
      if(res){
        this.getList();
      }
    });
    this.filetoUploadEdit = [];
    this.fileNameUpdate='';
    this.attachFileUpdate = '';
    this.partnerUpdateName ='';
    this.partnerStatus='';
    this.editBox=false;
  }

  deleteData(rowID){
    this.service.deletePartner(rowID,this.id).subscribe(res=>{
      if(res){
        this.getList();
      }
    });
  }

  close(){
    this.fileNameUpdate='';
    this.attachFileUpdate = '';
    this.partnerUpdateName ='';
    this.partnerStatus='';
    this.editBox=false;
  }

  changedValue(value){
    if(value == this.partnStatus[1].name){
      this.selectValue = 'Active';
      this.selectedOptn = 1;
    }
    else if(value == this.partnStatus[0].name){
      this.selectValue = 'In-Active';
      this.selectedOptn = 0;
    }
  }

}
