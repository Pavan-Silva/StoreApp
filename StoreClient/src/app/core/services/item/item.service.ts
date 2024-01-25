import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {item} from "../../models/item.model";
import {environment} from "../../../environment";

const API_URL = environment.apiUrl + '/items';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getAllItems() {
    return this.http.get<item[]>(API_URL);
  }

  searchItems(query:string, param:string) {
    return this.http.get<item[]>(API_URL);
  }

  getItemById(id:number) {
    return this.http.get<item>(API_URL + '/' + id);
  }

  saveItem(item:item) {
    return this.http.post<item>(API_URL, item);
  }

  updateItem(item:item) {
    return this.http.put<item>(API_URL, item);
  }

  deleteById(id:number) {
    return this.http.delete<item>(API_URL + '/' + id);
  }
}
