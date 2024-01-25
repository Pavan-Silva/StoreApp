import {Injectable} from '@angular/core';
import {user} from "../../models/user.model";

const USER_KEY= "auth-user";
const AUTHORITIES_KEY= "user-authorities";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  logOut() {
    sessionStorage.clear();
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(AUTHORITIES_KEY);
  }

  isLoggedIn(){
    return !!localStorage.getItem(USER_KEY);
  }

  saveUser(user:user) {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser():user {
    const user = localStorage.getItem(USER_KEY);

    if (user) {
      return JSON.parse(user);
    }

    return <user>({});
  }

  saveUserAuthorities(authorities:any) {
    localStorage.removeItem(AUTHORITIES_KEY);
    localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  getUserAuthorities(): string[] {
    const authorities = localStorage.getItem(AUTHORITIES_KEY);

    if (authorities) {
      return JSON.parse(authorities);
    }

    return [];
  }
}
