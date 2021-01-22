import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { SharedataService } from '../sharedata.service';

@Injectable()
export class AuthService
{
  role_id : any;

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loginData:any;
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }


  constructor(
    private router: Router,
    private http: HttpClient,
    private data: DataService,
    private service : SharedataService
  ) {}

  login(user: User) {
    if (user.userName !== '' && user.password !== '' ) {
      this.data.getLogin(user.userName,user.password).subscribe(res=>{
        this.loginData = res;
        localStorage.setItem('phone', this.loginData.data[0].mobile)
        localStorage.setItem('id', this.loginData.data[0].id)

        this.loggedIn.next(true);
        this.role_id = this.loginData.data[0].role_id;

        this.router.navigate(['dashboard']);


        // if(this.role_id == 3)
        // {
        //   this.router.navigate(['/blog']);
        // }
        // else if(this.role_id == 4)
        // {
        //   this.router.navigate(['/faqlist']);
        // }
        // else if(this.role_id == 5)
        // {
        //   this.router.navigate(['/viewlist']);
        // }
        // else if(this.role_id == 1)
        // {
        //   this.router.navigate(['dashboard']);
        // }

        if(this.role_id!='')
        {
          // this.data.getPermission(this.role_id).subscribe( res=>{
          //   console.log("Res of Per = ",res)
          // });
          this.service.setRoleId(this.role_id);
          localStorage.setItem("role_id",this.role_id);
        }
      },
      err=>{
        alert('Username or Password is Incorrect');
      })
    }
  }
  

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('role_id');
    this.router.navigate(['/login']);
  }
}