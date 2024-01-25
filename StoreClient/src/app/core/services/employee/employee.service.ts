import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {employee} from "../../models/employee.model";
import {environment} from "../../../environment";

const API_URL = environment.apiUrl + '/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllEmployees() {
    return this.http.get<employee[]>(API_URL);
  }

  getEmployeeByEmpNo(empNo:string) {
    return this.http.get<employee>(API_URL + '/' + empNo);
  }

  searchEmployees(query:string, filter:string) {
    if (filter === 'nic') return this.http.get<employee[]>(API_URL, {params:{nic:query}});
    else if (filter === 'empno') return this.http.get<employee[]>(API_URL, {params:{empno:query}});
    else return this.http.get<employee[]>(API_URL, {params:{name:query}});
  }

  saveEmployee(employee:employee) {
    return this.http.post<employee>(API_URL, employee);
  }

  updateEmployee(employee:employee) {
    return this.http.put<employee>(API_URL, employee);
  }

  deleteEmployee(empNo:string) {
    return this.http.delete(API_URL +'/' + empNo);
  }
}
