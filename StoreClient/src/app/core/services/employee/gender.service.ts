import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {gender} from "../../models/gender.model";
import {environment} from "../../../environment";

const API_URL = environment.apiUrl + '/employees/genders';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private http: HttpClient) { }

  getGenderList() {
    return this.http.get<gender[]>(API_URL);
  }
}
