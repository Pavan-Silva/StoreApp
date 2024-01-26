import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {item} from "../../models/item.model";
import {purchaseOrder} from "../../models/purchase-order.model";
import {environment} from "../../../environment";

const API_URL = environment.apiUrl + '/purchase-orders';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  constructor(private http: HttpClient) { }

  getAllOrders() {
    return this.http.get<purchaseOrder[]>(API_URL);
  }

  getOrderById(id:number) {
    return this.http.get<purchaseOrder>(API_URL + '/' + id);
  }

  searchPurchaseOrders(query:string, filter:string) {
    return this.http.get<purchaseOrder[]>(API_URL, {params:{supplier:query}});
  }

  saveOrder(item:item) {
    return this.http.post<purchaseOrder>(API_URL, item);
  }

  updateOrder(item:item) {
    return this.http.put<purchaseOrder>(API_URL, item);
  }

  deleteById(id:number) {
    return this.http.delete<purchaseOrder>(API_URL + '/' + id);
  }
}
