import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment";
import {porderItem} from "../../models/porder-item.model";
import {purchaseOrderStatus} from "../../models/purchase-order-status.model";

const API_URL = environment.apiUrl + '/purchase-orders/status';

@Injectable({
  providedIn: 'root'
})
export class PorderStatusService {

  constructor(private http: HttpClient) { }

  getAllOrderStatuses() {
    return this.http.get<purchaseOrderStatus[]>(API_URL);
  }
}
