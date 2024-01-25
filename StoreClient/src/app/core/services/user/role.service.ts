import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {role} from "../../models/role.model";
import {environment} from "../../../environment";

const API_URL = environment.apiUrl + '/users/roles';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getRoleList() {
    return this.http.get<role[]>(API_URL);
  }
}
