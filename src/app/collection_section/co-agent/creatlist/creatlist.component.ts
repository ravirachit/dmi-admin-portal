import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-creatlist',
  templateUrl: './creatlist.component.html',
  styleUrls: ['./creatlist.component.scss']
})
export class CreatlistComponent implements OnInit 
{
  name : any = "";
  description : any = "";
  created_by : any = 1;
  fileToUpload : Array<File>;
  fileuploaded : any;
  res : any;
  fileName : string = 'Upload File';

  constructor(private http : HttpClient) 
  {}

  ngOnInit() {
  }

  selectFile(element)
  {
    this.fileToUpload = element.target.files;
    if(this.fileToUpload!=[])
    {
      this.fileName = this.fileToUpload[0].name;
    }
  }

  sendFile()
  {
    let formData = new FormData();

    for(let i=0;i<this.fileToUpload.length;i++)
    {
      formData.append("file",this.fileToUpload[i],this.fileToUpload[i].name);
      formData.append("created_by",this.created_by);
      formData.append("filename",this.name);
      formData.append("description",this.description);
    }

    this.http.post('https://dmi.vistaconnect.com/dmi-clubbed-backend/api/collectiondata/collectiondataimport', formData).subscribe((response) =>
    {
      this.res = response;
      this.fileuploaded = this.res.status;

      if(this.fileuploaded==200)
      {
        Swal.fire({
          title: 'File Uploaded',
          text: 'Your File have been Uploaded Successfully',
          type: 'success',
          confirmButtonText: 'OK',
        });
      }
      this.fileName = '';
      this.name = '';
      this.description = '';
    });
  }

  downloadCSV(){
    window.open("https://los.dmifinance.in/admin/collectionsamplefile.csv");
  }

}
