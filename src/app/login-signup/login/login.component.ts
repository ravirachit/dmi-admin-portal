import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { AuthenticationService } from '../../_services';
import { first } from 'rxjs/operators';
import { DataService } from 'src/app/data.service';
import { SharedataService } from 'src/app/sharedata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  lastLogin:any;
  isLogging: boolean = false;
  role_id : any;
  paymenyLink_role:any;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private service: DataService,
    private shareService : SharedataService,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formData() { return this.form.controls; }


  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    // if (this.form.valid) {
    //   this.authService.login(this.form.value);
    // }
    // this.formSubmitAttempt = true;
    this.isLogging = true;
    this.authenticationService.loginWithPassword(this.formData.userName.value, this.formData.password.value).pipe(first()).subscribe(res => {
      this.lastLogin = res
      this.isLogging = false;
      localStorage.setItem('userId',this.lastLogin.data.id);
      localStorage.setItem('token',this.lastLogin.data.token);



      this.role_id = this.lastLogin.data.role_id;
      
      if(this.role_id!='')
      {
        this.service.getPermission(this.role_id).subscribe( res=>{
        });
        // this.shareService.setRoleId(this.role_id);
        localStorage.setItem("role_id",this.role_id);
        

        // if(this.role_id == 3)
        // {
        //   this.route.navigate(['blog']);
        // }
        // else if(this.role_id == 4)
        // {
        //   this.route.navigate(['faqlist']);
        // }
        
        if(this.role_id == 1)
        {
          this.route.navigate(['dashboard']);
        }
        else if(this.role_id == 2)
        {
          this.route.navigate(['e-dashboard']);
        }
        else if(this.role_id == 3)
        {
          this.route.navigate(['x-sell-dashboard']);
        }
        else if(this.role_id == 4)
        {
          this.route.navigate(['cust-dashboard']);
        }
        else if(this.role_id == 5)
        {
          this.route.navigate(['viewlist']);
        }
        else if(this.role_id == 8 || this.role_id == 9)
        {
          this.route.navigate(['paylink']);
        }
      }
      
      // this.route.navigate(['events']);
      // this.route.navigate(['dashboard']);

      },
      error => {
        alert('Wrong login credential.')
        this.isLogging = false;
      });
  }
}
