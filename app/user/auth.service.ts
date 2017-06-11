import { Injectable } from '@angular/core';
import { IUser } from "./user.model";
import { Http, Headers, Response, ResponseOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx'

@Injectable()
export class AuthService {
    currentUser: IUser
    constructor(private http: Http) { }

    loginUser(userName: string, password: string) {
       let headers = new Headers({ "Content-Type": "application/json" });
        let options = new ResponseOptions({ headers: headers });

        let loginInfo = {
            username: userName,
            password
        }

        return this.http.post('/api/login', JSON.stringify(loginInfo), options).do((response)=> {
            if(response) {
                return this.currentUser = <IUser>response.json().user;
            }
        }).catch(error => {
            return Observable.of(false);
        });
    }

    isAuthenticated () {
        return !!this.currentUser;
    }

    updateCurrentUser(firstName, lastName){
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
    } 

}