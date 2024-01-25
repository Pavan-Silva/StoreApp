import {purchaseOrder} from "./purchase-order.model";
import {item} from "./item.model";

export interface porderItem {
  id?: number;
  lineTotal: number;
  quantity: number;
  purchaseOrder: purchaseOrder;
  item: item;
}
