import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {employeeStatus} from "../../models/employee-status.model";
import {environment} from "../../../environment";

const API_URL = environment.apiUrl + '/employees/status';

@Injectable({
  providedIn: 'root'
})
export class EmployeeStatusService {

  constructor(private http: HttpClient) { }

  getStatusList() {
    return this.http.get<employeeStatus[]>(API_URL);
  }
}
