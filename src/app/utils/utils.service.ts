import {Injectable} from '@angular/core';
import {AuthBody} from './auth-body';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class Utils {

  constructor() {
  }

  httpHeaders() {
    const token: string = this.getToken();
    let headers = new HttpHeaders();

    if (token) { // token is present
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return {
      headers: headers
    };
  }

  getToken(): string {
    /*let authBody: AuthBody = this.getAuthBody();
    if (authBody) {
      return authBody.token;
    } else {
      return null;
    }*/
      if (!localStorage.getItem('app-token')) {
          return null;
      } else {
          return localStorage.getItem('app-token') ;
      }
  }

  getAppUser(): any {
    let authBody: AuthBody = this.getAuthBody();
    if (authBody) {
      return authBody.user;
    } else {
      return null;
    }
  }

  getAuthBody(): AuthBody {
    if (!localStorage.getItem('app-token')) {
      return null;
    } else {
      return JSON.parse(atob(localStorage.getItem('app-token')));
    }
  }

  uploadOption() {
    const token: string = this.getToken();
    let _headers = new HttpHeaders();
    if (token) {
      _headers = _headers.set('enctype', 'multipart/form-data');
      _headers = _headers.set('Authorization', 'Bearer ' + token);
    }
    return {headers: _headers};
  }


}
