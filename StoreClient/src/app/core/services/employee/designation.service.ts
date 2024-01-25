import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {designation} from "../../models/designation.model";
import {environment} from "../../../environment";

const API_URL = environment.apiUrl + '/employees/designations';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(private http: HttpClient) { }

  getAllDesignations() {
    return this.http.get<designation[]>(API_URL);
  }
}
