import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {ItemService} from "../../../core/services/item/item.service";
import {PorderItemService} from "../../../core/services/order/porder-item.service";
import {item} from "../../../core/models/item.model";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {porderItem} from "../../../core/models/porder-item.model";
import {purchaseOrder} from "../../../core/models/purchase-order.model";
import {NotificationSnackBarComponent} from "../../../shared/notification-snack-bar/notification-snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PurchaseOrderService} from "../../../core/services/order/purchase-order.service";

@Component({
  selector: 'app-order-item-form-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogClose,
    ReactiveFormsModule
  ],
  templateUrl: './order-item-form-dialog.component.html',
})
export class OrderItemFormDialogComponent implements OnInit {

  orderItemForm: FormGroup;

  currentOperation = '';
  currentPurchaseOrder = <purchaseOrder>({});
  currentOrderItem = <porderItem>({});

  isLoading = false;

  itemList:item[] = [];

  constructor(
    private formBuilder:FormBuilder,
    private itemService:ItemService,
    private purchaseOrderService:PurchaseOrderService,
    private porderItemService:PorderItemService,
    private dialog:MatDialog,
    private dialogRef:MatDialogRef<OrderItemFormDialogComponent>,
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data:{currentOrderItemId:number, orderId:number},
  ) {
    this.orderItemForm = this.formBuilder.group({
      item: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]+$/)]
      ],

      quantity: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]+$/)]
      ]
    });
  }

  ngOnInit(): void {
    this.itemService.getAllItems().subscribe({
      next: data => this.itemList = data,
      error: () => this.handleResult('failed')
    });

    if (this.data.orderId) {
      this.purchaseOrderService.getOrderById(this.data.orderId).subscribe({
        next: data => this.currentPurchaseOrder = data,
        error: () => this.handleResult('failed')
      });

    } else this.handleResult('failed');

    if (this.data.currentOrderItemId){
      this.porderItemService.getOrderItemById(this.data.currentOrderItemId).subscribe({
        next: data => {
          this.currentOrderItem = data;
          this.autofillForm();
        },
        error: () => this.handleResult('failed')
      });
    }

    else this.currentOperation = 'Add Item to Order';
  }

  private autofillForm() {
    this.orderItemForm.setValue({
      item: this.currentOrderItem.item.id,
      quantity: this.currentOrderItem.quantity
    });

    this.currentOperation = "Update Order Item";
  }

  showConfirmationDialog() {
    this.dialog.open(ConfirmDialogComponent, {data:this.currentOperation})
      .afterClosed().subscribe(res => {
      if (res) this.handleSubmit();
    });
  }

  private handleSubmit() {
    if (this.orderItemForm.valid) {
      const item = this.itemList.filter(item =>
        item.id === parseInt(this.orderItemForm.controls['item'].value)
      );

      const pendingOrderItem = {
        item: item[0],
        quantity: parseInt(this.orderItemForm.controls['quantity'].value),
        order: this.currentPurchaseOrder
      }

      if (this.currentOperation.includes('Add')) this.saveOrderItem(pendingOrderItem);
      if (this.currentOperation.includes('Update') && this.currentOrderItem.id) this.updateOrderItem(pendingOrderItem);
    }
  }

  private saveOrderItem(item:porderItem) {
    this.porderItemService.saveOrderItem(item).subscribe({
      next: () => {
        this.handleResult('success');
      },

      error: () => {
        this.handleResult('failed');
      }
    });
  }

  private updateOrderItem(item:porderItem) {
    item.id = this.currentOrderItem.id;

    this.porderItemService.updateOrderItem(item).subscribe({
      next: () => {
        this.handleResult('success');
      },

      error: () => {
        this.handleResult('failed');
      }
    });
  }

  clearForm() {
    this.orderItemForm.reset();
  }

  private handleResult(status:string) {
    this.dialogRef.close(true);

    this.snackBar.openFromComponent(NotificationSnackBarComponent, {
      duration: 3000,
      horizontalPosition: "right",
      data: status
    });
  }
}
