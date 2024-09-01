import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData=new BehaviorSubject("");

  decodeUserData(){
    let encodedToken =JSON.stringify(localStorage.getItem("userToken"));
   // let decodedToken:any =jwtDecode(encodedToken);
    this.userData.next("some");
    //console.log(decodedToken)
  }
  constructor(private _HttpClient:HttpClient,private _Router:Router) {
    if (localStorage.getItem("userToken")!==null){
      this.decodeUserData();
    }
  }
  register(userData:Object):Observable<any>{
      return this._HttpClient.post(
        "http://localhost:8080/register",userData
      );
  }
  login(userData:object):Observable<any>{
    return this._HttpClient.post(
      "http://localhost:8080/login",userData
    )
  }
  logout(){
    localStorage.removeItem("userToken");
    this.userData.next("");
    this._Router.navigate(['/login']);
  }
}
