import {purchaseOrder} from "./purchase-order.model";
import {item} from "./item.model";

export interface porderItem {
  id?: number;
  lineTotal?: number;
  quantity: number;
  order: purchaseOrder;
  item: item;
}
