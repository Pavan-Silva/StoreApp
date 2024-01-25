import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {employeeStatus} from "../../models/employee-status.model";
import {environment} from "../../../environment";

const API_URL = environment.apiUrl + '/users/status';

@Injectable({
  providedIn: 'root'
})
export class UserStatusService {

  constructor(private http: HttpClient) { }

  getUserStatusList() {
    return this.http.get<employeeStatus[]>(API_URL);
  }
}
