import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose} from "@angular/material/dialog";
import {PorderItemService} from "../../../core/services/order/porder-item.service";
import {porderItem} from "../../../core/models/porder-item.model";
import {AuthorizationService} from "../../../core/services/auth/authorization.service";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {OrderItemFormComponent} from "../order-item-form/order-item-form.component";
import {NotificationSnackBarComponent} from "../../../shared/notification-snack-bar/notification-snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogLoadingComponent} from "../../../shared/dialog-loading/dialog-loading.component";

@Component({
  selector: 'app-order-item-list',
  standalone: true,
  imports: [
    MatDialogClose,
    DialogLoadingComponent
  ],
  templateUrl: './order-item-list.component.html'
})
export class OrderItemListComponent implements OnInit {

  protected hasUpdateAuthority = false;
  protected hasDeleteAuthority = false;

  isFailed = false;
  isLoading = false;

  itemList: porderItem[] = [];

  constructor(
    private dialog:MatDialog,
    private orderItemService:PorderItemService,
    private authorizationService:AuthorizationService,
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data:{orderId:number, orderStatus:string}
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.hasUpdateAuthority = this.authorizationService.hasAuthority('PurchaseOrders-Update');
    this.hasDeleteAuthority = this.authorizationService.hasAuthority('PurchaseOrders-Delete');

    if (this.data.orderStatus === 'Completed') {
      this.hasDeleteAuthority = false;
      this.hasUpdateAuthority = false;
    }

    this.refreshOrderItemList();
  }

  refreshOrderItemList() {
    this.orderItemService.getItemsByOrderId(this.data.orderId).subscribe({
      next: data => {
        this.itemList = data;
        this.isFailed = false;
        this.isLoading = false;
      },

      error: () => {
        this.isFailed = true;
        this.isLoading = false;
      }
    });
  }

  showNewFormDialog() {
    this.dialog.open(OrderItemFormComponent,
      {data: {orderId:this.data.orderId}
      }).afterClosed().subscribe((refresh:boolean) => {
      if (refresh) this.refreshOrderItemList();
    });
  }

  showFormDialog(item:porderItem) {
    this.dialog.open(OrderItemFormComponent,
      {data: {
            currentOrderItemId:item.id,
            orderId:this.data.orderId
          }
      }).afterClosed().subscribe((refresh:boolean) => {
      if (refresh) this.refreshOrderItemList();
    });
  }

  deleteOrderItem(item:porderItem) {
    this.dialog.open(ConfirmDialogComponent, {data:'Edit Order Item'})
      .afterClosed().subscribe(res => {
      if (res && item.id) {
        this.orderItemService.deleteById(item.id).subscribe({
          next: () => {
            this.refreshOrderItemList();
            this.handleResult('success');
          },

          error: () => {
            this.handleResult('failed');
          }
        });
      }
    });
  }

  handleResult(status:string) {
    this.snackBar.openFromComponent(NotificationSnackBarComponent, {
      duration: 3000,
      horizontalPosition: "right",
      data: status
    });
  }
}
