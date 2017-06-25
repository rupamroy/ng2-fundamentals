import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
    currentUser: IUser;
    constructor(private http: Http) { }

    loginUser(userName: string, password: string) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new ResponseOptions({ headers });

        const loginInfo = {
            username: userName,
            password
        };

        return this.http.post('/api/login', JSON.stringify(loginInfo), options).do((response) => {
            if (response) {
                return this.currentUser = response.json().user as IUser;
            }
        }).catch(error => {
            return Observable.of(false);
        });
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    checkAuthenticationStatus() {
        return this.http.get('/api/currentIdentity').map((response: any) => {
            if (response._body) {
                return response.json();
            } else {
                return {};
            }
        }).do((resp) => {
            if(!!resp.userName) {
                this.currentUser = resp;
            }
        }).subscribe();
    }

    updateCurrentUser(firstName, lastName) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new ResponseOptions({ headers });

        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
    }

    logout() {
        this.currentUser = void 0;

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new ResponseOptions({ headers });

        return this.http.post(`/api/logout`, {}, options);

    }

}
