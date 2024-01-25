import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {supplier} from "../../models/supplier.model";
import {environment} from "../../../environment";

const API_URL = environment.apiUrl + '/suppliers';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  getAllSuppliers() {
    return this.http.get<supplier[]>(API_URL);
  }

  searchSuppliers(query:string, param:string) {
    return this.http.get<supplier[]>(API_URL, {params:{name:query}});
  }

  getSupplierById(id:number) {
    return this.http.get<supplier>(API_URL + '/' + id);
  }

  saveSupplier(supplier:supplier) {
    return this.http.post<supplier>(API_URL, supplier);
  }

  updateSupplier(supplier:supplier) {
    return this.http.put<supplier>(API_URL, supplier);
  }

  deleteById(id:number) {
    return this.http.delete(API_URL + '/' + id);
  }
}
