import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {module} from "../../models/module.model";

const API_URL = 'http://localhost:8080/api/users/modules';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient) { }

  getModuleList() {
    return this.http.get<module[]>(API_URL);
  }
}
