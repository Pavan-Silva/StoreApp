import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {supplier} from "../../../core/models/supplier.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PurchaseOrderService} from "../../../core/services/order/purchase-order.service";
import {SupplierService} from "../../../core/services/supplier/supplier.service";
import {NotificationSnackBarComponent} from "../../../shared/notification-snack-bar/notification-snack-bar.component";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {purchaseOrder} from "../../../core/models/purchase-order.model";
import {PorderStatusService} from "../../../core/services/order/porder-status.service";
import {purchaseOrderStatus} from "../../../core/models/purchase-order-status.model";
import {DialogLoadingComponent} from "../../../shared/dialog-loading/dialog-loading.component";

@Component({
  selector: 'app-purchase-order-form',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogClose,
    ReactiveFormsModule,
    DialogLoadingComponent
  ],
  templateUrl: './purchase-order-form.component.html'
})
export class PurchaseOrderFormComponent implements OnInit {

  purchaseOrderForm: FormGroup;

  currentOperation = '';
  currentPurchaseOrder = <purchaseOrder>({});

  isLoading = false;

  supplierList:supplier[] = [];
  orderStatusList:purchaseOrderStatus[] = [];

  constructor(
    private purchaseOrderService:PurchaseOrderService,
    private purchaseOrderStatusService:PorderStatusService,
    private supplierService:SupplierService,
    private formBuilder:FormBuilder,
    private dialog:MatDialog,
    private dialogRef:MatDialogRef<PurchaseOrderFormComponent>,
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) protected currentPurchaseOrderId:number,
  ) {
    let currentDate = new Date().toJSON().slice(0, 10);

    this.purchaseOrderForm = this.formBuilder.group({
      supplier: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]+$/)]
      ],

      orderStatus: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]+$/)]
      ],

      expectedTotal: [
        null,
        [Validators.required]
      ],

      doCreated: [
        currentDate,
        [Validators.required]
      ]
    });
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.supplierService.getAllSuppliers().subscribe({
      next: data => {
        this.supplierList = data;
      },

      error: () => this.handleResult('failed')
    });

    this.purchaseOrderStatusService.getAllOrderStatuses().subscribe({
      next: data => {
        this.orderStatusList = data;
      },

      error: () => this.handleResult('failed')
    });

    if (this.currentPurchaseOrderId) {
      this.purchaseOrderService.getOrderById(this.currentPurchaseOrderId).subscribe({
        next: data => {
          this.currentPurchaseOrder = data;
          this.autofillForm();
          this.isLoading = false;
        },

        error: () => this.handleResult('failed')
      });
    } else {
      this.currentOperation = 'Add Purchase Order';
      this.isLoading = false;
    }
  }

  private autofillForm() {
    this.purchaseOrderForm.setValue({
      supplier: this.currentPurchaseOrder.supplier.id,
      orderStatus: this.currentPurchaseOrder.orderStatus.id,
      doCreated: this.currentPurchaseOrder.doCreate,
      expectedTotal: this.currentPurchaseOrder.expectedTotal?.toFixed(2)
    });

    this.currentOperation = 'Update Order';
  }

  showConfirmationDialog() {
    this.dialog.open(ConfirmDialogComponent, {data:this.currentOperation})
      .afterClosed().subscribe(res => {
      if (res) this.handleSubmit();
    });
  }

  private handleSubmit() {
    if (this.purchaseOrderForm.valid) {
      const supplier = this.supplierList.filter(s =>
        s.id === parseInt(this.purchaseOrderForm.controls['supplier'].value)
      );

      const pendingOrder = {
        supplier: supplier[0],
        orderStatus: { id: parseInt(this.purchaseOrderForm.controls['orderStatus'].value) },
        doCreate: this.purchaseOrderForm.controls['doCreated'].value,
        expectedTotal: this.purchaseOrderForm.controls['expectedTotal'].value,
      }

      if (this.currentOperation.includes('Add')) this.saveOrder(pendingOrder);
      if (this.currentOperation.includes('Update') && this.currentPurchaseOrder.id) this.updateOrder(pendingOrder);
    }
  }

  private saveOrder(order:purchaseOrder) {
    this.purchaseOrderService.saveOrder(order).subscribe({
      next: () => {
        this.handleResult('success');
      },

      error: () => {
        this.handleResult('failed');
      }
    });
  }

  private updateOrder(order:purchaseOrder) {
    order.id = this.currentPurchaseOrder.id;

    this.purchaseOrderService.updateOrder(order).subscribe({
      next: () => {
        this.handleResult('success');
      },

      error: () => {
        this.handleResult('failed');
      }
    });
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
