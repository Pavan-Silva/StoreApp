import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {user} from "../../models/user.model";
import {environment} from "../../../environment";

const API_URL = environment.apiUrl + '/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<user[]>(API_URL);
  }

  searchUsers(query:string, param:string) {
    return this.http.get<user[]>(API_URL, {params:{name:query}});
  }

  getUserById(id:number) {
    return this.http.get<user>(API_URL + '/' + id);
  }

  saveUser(user:user) {
    return this.http.post<user>(API_URL, user);
  }

  updateUser(user:user) {
    return this.http.put<user>(API_URL, user);
  }

  deleteUserById(id:number) {
    return this.http.delete<user>(API_URL + '/' + id);
  }
}
