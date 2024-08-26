import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import {AuthService} from "../auth.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  isLoading:boolean =false;
  apiError:string="";

  registerForm : FormGroup = new FormGroup({ // take an object of controls
    // we declare the inputs give them the same names as server side
    name : new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    rePassword: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    phone: new FormControl(null,[Validators.required]),
  });

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  handleRegister(registerForm: FormGroup){
    this.isLoading=true;
    console.log(registerForm);

    if (registerForm.valid){

      /* this is just for testing , to delete when server side is running */
        setTimeout(() => {
          this._Router.navigate(["/login"]);
        }, 2000); // just a delay to see the spiner
      /**/

      this._AuthService.register(registerForm.value).subscribe({
        next:(response)=>{
          if (response.message ==="success"){
            // navigate Login
            this._Router.navigate(["/login"]);
          }
        },
        error:(err)=>{
          console.log(err.error?.errors?.mssg)   // for example email already in use
          this.apiError=err.error?.errors?.mssg;

        },
        complete:()=>{
          this.isLoading=false;
        }
      })
    }
  }
}


