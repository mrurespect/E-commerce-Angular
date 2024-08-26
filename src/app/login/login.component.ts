import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Route, Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoading:boolean=false;
  apiError:string='';
  loginForm:FormGroup =new FormGroup({
    email: new FormControl(null,[Validators.required]) ,
    password:new FormControl(null,[Validators.required])
  })

  constructor(private _AuthService:AuthService,private _Router:Router) {
  }
  handleLogin(loginForm:FormGroup){
    console.log(loginForm)
    this.isLoading=true;
    if (loginForm.valid){

      /* this is just for testing , to delete when server side is running */
      setTimeout(() => {
        this.isLoading=false;
        this._Router.navigate(["/home"]);
      }, 2000); // just a delay to see the spiner
      /**/

      this._AuthService.login(loginForm.value).subscribe({
        next:(response)=>{
          if (response.message ==="success"){
            // navigate Login
            this._Router.navigate(["/home"]);
          }
        },
        error:(err)=>{
          console.log(err.error?.errors?.mssg)   // for example invalid password
          this.apiError=err.error?.errors?.mssg;
        },
        complete:()=>{
          this.isLoading=false;
        }
      })
    }
  }

}
