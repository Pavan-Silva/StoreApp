import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../../../core/services/auth/authorization.service";
import {MatDialog} from "@angular/material/dialog";
import {PurchaseOrderService} from "../../../core/services/order/purchase-order.service";
import {purchaseOrder} from "../../../core/models/purchase-order.model";
import {ItemListDialogComponent} from "../item-list-dialog/item-list-dialog.component";
import {PurchaseOrderFormDialogComponent} from "../purchase-order-form-dialog/purchase-order-form-dialog.component";
import {ErrorComponent} from "../../../shared/error/error.component";
import {LoadingComponent} from "../../../shared/loading/loading.component";

@Component({
  selector: 'app-purchase-orders',
  standalone: true,
  imports: [
    ErrorComponent,
    LoadingComponent
  ],
  templateUrl: './purchase-order-table.component.html',
})
export class PurchaseOrderTableComponent implements OnInit {

  protected hasUpdateAuthority = false;
  protected hasDeleteAuthority = false;

  orders:purchaseOrder[] = [];

  isFailed = false;
  isLoading = false;

  constructor(
    private purchaseOrderService:PurchaseOrderService,
    private authorizationService:AuthorizationService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.hasUpdateAuthority = this.authorizationService.hasAuthority('PurchaseOrders-Update');
    this.hasDeleteAuthority = this.authorizationService.hasAuthority('PurchaseOrders-Delete');

    this.purchaseOrderService.getAllOrders().subscribe({
      next: data => {
        this.orders = data;
        this.isFailed = false;
        this.isLoading = false;
      },

      error: () => {
        this.isFailed = true;
        this.isLoading =false;
      }
    });
  }

  viewItemList(order:purchaseOrder) {
    this.dialog.open(ItemListDialogComponent, {data:order.id});
  }

  showEditDialog(order:purchaseOrder) {
    this.dialog.open(PurchaseOrderFormDialogComponent, {data:order.id});
  }

  showConfirmationDialog(order:purchaseOrder) {
    // const operation = "Delete Order";
    //
    // this.dialog.open(ConfirmDialogComponent, {data:operation})
    //   .afterClosed().subscribe(res => {
    //   if (res) this.deleteOrder(order);
    // });
  }

  deleteOrder(order:purchaseOrder) {
    // if (order.id) {
    //   this.purchaseOrderService.deleteById(order.id).subscribe({
    //     next: () => {
    //       this.showResultDialog('Success');
    //     },
    //
    //     error: () => {
    //       this.showResultDialog('Failed');
    //     }
    //   });
    // } else this.showResultDialog('Failed');
  }

  // showResultDialog(status:string) {
  //   this.dialog.open(ResultDialogComponent, {data:status})
  //     .afterClosed().subscribe(() => this.pageRefresh());
  // }
}
