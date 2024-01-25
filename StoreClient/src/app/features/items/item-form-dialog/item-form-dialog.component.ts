import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ItemService} from "../../../core/services/item/item.service";
import {item} from "../../../core/models/item.model";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {NotificationSnackBarComponent} from "../../../shared/notification-snack-bar/notification-snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-item-form-dialog',
  standalone: true,
  imports: [
    MatDialogClose,
    ReactiveFormsModule
  ],
  templateUrl: './item-form-dialog.component.html'
})
export class ItemFormDialogComponent implements OnInit {

  itemForm: FormGroup;
  isLoading = false;
  currentOperation = '';
  currentItem: item = <item>({});

  constructor(
    private itemService:ItemService,
    private formBuilder: FormBuilder,
    private dialog:MatDialog,
    private dialogRef:MatDialogRef<ItemFormDialogComponent>,
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private currentItemId:number
  ) {
    this.itemForm = this.formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.pattern(/^[A-Za-z0-9\s]*$/)]
      ],

      purchasePrice: [null, Validators.required],
      salePrice: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.currentItemId) {
      this.isLoading = true;

      this.itemService.getItemById(this.currentItemId).subscribe({
        next: data => {
          this.currentItem = data;
          this.autofillForm();
          this.isLoading = false;
        },

        error: () => this.handleResult('failed')
      });

    } else this.currentOperation = 'Save Item';
  }

  autofillForm() {
    this.itemForm.setValue({
      name: this.currentItem.name,
      purchasePrice: this.currentItem.purchasePrice.toFixed(2),
      salePrice: this.currentItem.salePrice.toFixed(2),
    });

    this.currentOperation = 'Update' + " '" + this.currentItem.name + "'";
  }

  showConfirmationDialog() {
    this.dialog.open(ConfirmDialogComponent, {data:this.currentOperation})
      .afterClosed().subscribe(res => {
      if (res) this.handleSubmit();
    });
  }

  handleSubmit() {
    if (this.itemForm.valid) {
      const pendingItem : item = {
        name: this.itemForm.controls['name'].value,
        purchasePrice: parseFloat(this.itemForm.controls['purchasePrice'].value),
        salePrice: parseFloat(this.itemForm.controls['salePrice'].value)
      }

      if (this.currentItem && this.currentOperation.includes('Update')) {
        pendingItem.id = this.currentItem.id;
        this.saveItem(pendingItem);
      }

      else this.saveItem(pendingItem);
    }
  }

  private saveItem(item:item) {
    this.itemService.saveItem(item).subscribe({
      next: () => this.handleResult('success'),
      error: () => this.handleResult('failed')
    });
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