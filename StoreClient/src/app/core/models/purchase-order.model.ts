import {supplier} from "./supplier.model";
import {purchaseOrderStatus} from "./purchase-order-status.model";

export interface purchaseOrder {
  id?: number;
  doCreate?: string;
  expectedTotal?: number;
  supplier: supplier;
  orderStatus: purchaseOrderStatus;
}
