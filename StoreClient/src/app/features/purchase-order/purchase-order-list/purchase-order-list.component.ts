import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../../../core/services/auth/authorization.service";
import {MatDialog} from "@angular/material/dialog";
import {PurchaseOrderService} from "../../../core/services/order/purchase-order.service";
import {purchaseOrder} from "../../../core/models/purchase-order.model";
import {OrderItemListComponent} from "../order-item-list/order-item-list.component";
import {PurchaseOrderFormComponent} from "../purchase-order-form/purchase-order-form.component";
import {ErrorComponent} from "../../../shared/error/error.component";
import {PageLoadingComponent} from "../../../shared/page-loading/page-loading.component";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {NotificationSnackBarComponent} from "../../../shared/notification-snack-bar/notification-snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-purchase-orders',
  standalone: true,
  imports: [
    ErrorComponent,
    PageLoadingComponent
  ],
  templateUrl: './purchase-order-list.component.html',
})
export class PurchaseOrderListComponent implements OnInit {

  protected hasUpdateAuthority = false;
  protected hasDeleteAuthority = false;

  orders:purchaseOrder[] = [];

  isFailed = false;
  isLoading = false;

  currentSearchQuery = '';
  currentSearchParam = '';

  constructor(
    private purchaseOrderService:PurchaseOrderService,
    private authorizationService:AuthorizationService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.hasUpdateAuthority = this.authorizationService.hasAuthority('PurchaseOrders-Update');
    this.hasDeleteAuthority = this.authorizationService.hasAuthority('PurchaseOrders-Delete');

    this.route.queryParams.subscribe((params:any) =>{
      if (params.query && params.filter) {
        this.currentSearchParam = params.filter;
        this.currentSearchQuery = params.query;
        this.searchOrdersWithCurrentQuery();
      }

      else this.refreshOrderList();
    });
  }

  refreshOrderList() {
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

  searchOrdersWithCurrentQuery() {
    this.isLoading = true;

    this.purchaseOrderService.searchPurchaseOrders(this.currentSearchQuery, this.currentSearchParam).subscribe({
      next: data => {
        this.orders = data;
        this.isFailed = false;
        this.isLoading = false;
      },

      error: () => {
        this.isFailed = true;
        this.isLoading = false;
      }
    });
  }

  viewItemList(order:purchaseOrder) {
    this.dialog.open(OrderItemListComponent, {
      data:{
        orderId:order.id,
        orderStatus:order.orderStatus.name
      }
    });
  }

  showFormDialog(order:purchaseOrder) {
    this.dialog.open(PurchaseOrderFormComponent, {data:order.id})
      .afterClosed().subscribe((refresh:boolean) => {
      if (refresh) this.refreshOrderList();
    });
  }

  deleteOrder(order:purchaseOrder) {
    const operation = "Delete Order";

    this.dialog.open(ConfirmDialogComponent, {data:operation})
      .afterClosed().subscribe(res => {
      if (res) {
        if (order.id) {
          this.purchaseOrderService.deleteById(order.id).subscribe({
            next: () => {
              this.refreshOrderList();
              this.handleResult('success');
            },

            error: () => {
              this.handleResult('failed');
            }
          });
        } else this.handleResult('failed');
      }
    });
  }

  private handleResult(status:string) {
    this.snackBar.openFromComponent(NotificationSnackBarComponent, {
      duration: 3000,
      horizontalPosition: "right",
      data: status
    });
  }
}
