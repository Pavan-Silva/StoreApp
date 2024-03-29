import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {porderItem} from "../../models/porder-item.model";
import {environment} from "../../../environment";

const API_URL = environment.apiUrl + '/purchase-orders/items';

@Injectable({
  providedIn: 'root'
})
export class PorderItemService {

  constructor(private http: HttpClient) { }

  getItemsByOrderId(id:number) {
    return this.http.get<porderItem[]>(API_URL, {params:{orderid:id}});
  }

  getOrderItemById(id:number) {
    return this.http.get<porderItem>(API_URL+ '/' + id);
  }

  saveOrderItem(item:porderItem) {
    return this.http.post<porderItem>(API_URL, item);
  }

  updateOrderItem(item:porderItem) {
    return this.http.put<porderItem>(API_URL, item);
  }

  deleteById(id:number) {
    return this.http.delete(API_URL + '/' + id);
  }
}
