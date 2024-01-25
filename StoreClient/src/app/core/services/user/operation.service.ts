import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {operation} from "../../models/operation.model";
import {environment} from "../../../environment";

const API_URL = environment.apiUrl + '/users/operations';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http: HttpClient) { }

  getOperationList() {
    return this.http.get<operation[]>(API_URL);
  }
}
