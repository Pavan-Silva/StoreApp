import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment";

const API_URL = environment.apiUrl + '/users/authorities';

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  constructor(private http: HttpClient) { }

  getAllAuthorities() {
    return this.http.get(API_URL);
  }
}
