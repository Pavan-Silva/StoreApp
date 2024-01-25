import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment";

const API_URL = environment.apiUrl + '/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username:string, password:string) {
    return this.http.post(API_URL + 'login',{
      username,
      password
    });
  }

  refreshToken() {
    return this.http.get(API_URL + 'refresh');
  }

  logout() {
    return this.http.get(API_URL + 'logout');
  }
}
