import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedataService 
{
  public id : number;
  public role_id : number;
  public listId : number;
  public userData:any={};

  constructor() { }

  setId(id:number)
  {this.id=id;}

  setRoleId(role_id:number)
  {this.role_id=role_id;}

  setListId(listId:number)
  {this.listId=listId;}

  setUserDetails(userData:any){
    this.userData=userData;
  }

  getId()
  {return this.id;}

  getRoleId()
  {return this.role_id;}

  getListId()
  {return this.listId;}

  getUserDetails(){
    return this.userData;
  }

}
