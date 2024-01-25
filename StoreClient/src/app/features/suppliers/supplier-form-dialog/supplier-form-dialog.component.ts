import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SupplierService} from "../../../core/services/supplier/supplier.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {supplier} from "../../../core/models/supplier.model";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationSnackBarComponent} from "../../../shared/notification-snack-bar/notification-snack-bar.component";

@Component({
  selector: 'app-supplier-form-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './supplier-form-dialog.component.html'
})
export class SupplierFormDialogComponent implements OnInit {

  supplierForm: FormGroup;
  currentOperation = '';
  currentSupplier = <supplier>({});
  isLoading = false;

  protected formFieldList: string[] = [
    'name',
    'contactNo',
    'address'
  ];

  protected isValid = {
    name : true,
    contactNo : true,
    address : true,
  }

  constructor(
    private supplierService:SupplierService,
    private formBuilder:FormBuilder,
    private dialog:MatDialog,
    private dialogRef:MatDialogRef<SupplierFormDialogComponent>,
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private currentSupplierId:number,
  ) {
    this.supplierForm = this.formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}$/)]
      ],

      address: [null, Validators.required],

      contactNo: [
        null,
        [Validators.required, Validators.pattern(/^0[0-9]{9}$/)]
      ]
    });
  }

  ngOnInit(): void {
    if (this.currentSupplierId) {
      this.isLoading = true;

      this.supplierService.getSupplierById(this.currentSupplierId).subscribe({
        next: data => {
          this.currentSupplier = data;
          this.autofillForm();
          this.isLoading = false;
        },

        error: () => this.handleResult('failed')
      });

    } else this.currentOperation = 'Add Supplier';
  }

  autofillForm() {
    this.supplierForm.setValue({
      name: this.currentSupplier.name,
      contactNo: this.currentSupplier.contactNo,
      address: this.currentSupplier.address
    });

    this.currentOperation = 'Update' + " '" + this.currentSupplier.name + "'";
  }

  showConfirmationDialog() {
    this.dialog.open(ConfirmDialogComponent, {data:this.currentOperation})
      .afterClosed().subscribe(res => {
      if (res) this.handleSubmit();
    });
  }

  handleSubmit() {
    if (this.supplierForm.valid) {
      const pendingSupplier = {
        name: this.supplierForm.controls['name'].value,
        address: this.supplierForm.controls['address'].value,
        contactNo: this.supplierForm.controls['contactNo'].value,
      }

      if (this.currentOperation.includes('Add')) this.saveSupplier(pendingSupplier);
      if (this.currentOperation.includes('Update') && this.currentSupplier.id) this.updateSupplier(pendingSupplier);
    }

    this.formFieldList.map(field => {
      if (!this.supplierForm.controls[field].valid) { (this.isValid as any)[field] = false }
    });
  }

  private updateSupplier(supplier:supplier) {
    supplier.id = this.currentSupplier.id;

    this.supplierService.updateSupplier(supplier).subscribe({
      next: () => {
        this.handleResult('success');
      },

      error: () => {
        this.handleResult('failed');
      }
    });

  }

  private saveSupplier(supplier:supplier) {
    this.supplierService.saveSupplier(supplier).subscribe({
      next: () => {
        this.handleResult('success');
      },

      error: () => {
        this.handleResult('failed');
      }
    });
  }

  clearForm() {
    this.supplierForm.reset();
  }

  handleResult(status:string) {
    this.dialogRef.close(true);

    this.snackBar.openFromComponent(NotificationSnackBarComponent, {
      duration: 3000,
      horizontalPosition: "right",
      data: status
    });
  }
}
