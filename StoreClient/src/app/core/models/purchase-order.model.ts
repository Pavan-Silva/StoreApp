import {supplier} from "./supplier.model";

export interface purchaseOrder {
  id?: number;
  doCreate: string;
  expectedTotal: number;
  supplier: supplier;

  orderStatus: {
    id: number;
    name?: string;
  }
}
