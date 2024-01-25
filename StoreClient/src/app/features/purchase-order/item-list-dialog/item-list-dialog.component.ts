import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose} from "@angular/material/dialog";
import {PorderItemService} from "../../../core/services/order/porder-item.service";
import {porderItem} from "../../../core/models/porder-item.model";
import {AuthorizationService} from "../../../core/services/auth/authorization.service";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-item-list-dialog',
  standalone: true,
    imports: [
        MatDialogClose
    ],
  templateUrl: './item-list-dialog.component.html'
})
export class ItemListDialogComponent implements OnInit {
  protected hasUpdateAuthority = false;
  protected hasDeleteAuthority = false;

  isFailed = false;
  isLoading = false;

  itemList: porderItem[] = [];

  currentOperation:string = '';

  constructor(
    private dialog:MatDialog,
    private orderItemService:PorderItemService,
    private authorizationService:AuthorizationService,
    @Inject(MAT_DIALOG_DATA) private orderId:number
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.hasUpdateAuthority = this.authorizationService.hasAuthority('PurchaseOrders-Update');
    this.hasDeleteAuthority = this.authorizationService.hasAuthority('PurchaseOrders-Delete');

    this.orderItemService.getItemsByOrderId(this.orderId).subscribe({
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

  showConfirmationDialog() {
    this.dialog.open(ConfirmDialogComponent, {data:'Edit Order Item'})
      .afterClosed().subscribe(res => {
      if (res) this.handleSubmit();
    });
  }

  handleSubmit() {

  }
}
