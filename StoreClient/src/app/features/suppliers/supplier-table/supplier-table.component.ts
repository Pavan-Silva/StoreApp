import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {supplier} from "../../../core/models/supplier.model";
import {SupplierService} from "../../../core/services/supplier/supplier.service";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {SupplierFormDialogComponent} from "../supplier-form-dialog/supplier-form-dialog.component";
import {AuthorizationService} from "../../../core/services/auth/authorization.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationSnackBarComponent} from "../../../shared/notification-snack-bar/notification-snack-bar.component";
import {LoadingComponent} from "../../../shared/loading/loading.component";
import {ErrorComponent} from "../../../shared/error/error.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-supplier-table',
  standalone: true,
  imports: [
    LoadingComponent,
    ErrorComponent
  ],
  templateUrl: './supplier-table.component.html'
})
export class SupplierTableComponent implements OnInit {

  protected hasUpdateAuthority = false;
  protected hasDeleteAuthority = false;

  suppliers:supplier[] = [];

  isFailed = false;
  isLoading = false;

  currentSearchQuery = '';
  currentSearchParam = '';

  constructor(
    private supplierService:SupplierService,
    private authorizationService:AuthorizationService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.hasUpdateAuthority = this.authorizationService.hasAuthority('Suppliers-Update');
    this.hasDeleteAuthority = this.authorizationService.hasAuthority('Suppliers-Delete');

    this.route.queryParams.subscribe((params:any) =>{
      if (params.query && params.filter) {
        this.currentSearchParam = params.filter;
        this.currentSearchQuery = params.query;
        this.searchSuppliersWithCurrentQuery();
      }

      else this.refreshSupplierList();
    });
  }

  refreshSupplierList() {
    this.supplierService.getAllSuppliers().subscribe({
      next: data => {
        this.suppliers = data;
        this.isFailed = false;
        this.isLoading = false;
      },

      error: () => {
        this.isFailed = true;
        this.isLoading = false;
      }
    });
  }

  searchSuppliersWithCurrentQuery() {
    this.isLoading = true;

    this.supplierService.searchSuppliers(this.currentSearchQuery, this.currentSearchParam).subscribe({
      next: data => {
        this.suppliers = data;
        this.isFailed = false;
        this.isLoading = false;
      },

      error: () => {
        this.isFailed = true;
        this.isLoading = false;
      }
    });
  }

  showFormDialog(supplier:supplier) {
    this.dialog.open(SupplierFormDialogComponent, {data:supplier.id})
      .afterClosed().subscribe((refresh:boolean) => {
        if (refresh) this.refreshSupplierList();
    });
  }

  deleteSupplier(supplier:supplier) {
    const operation = "Delete Supplier";

    this.dialog.open(ConfirmDialogComponent, {data:operation})
      .afterClosed().subscribe(res => {
      if (res) {
        if (supplier.id) {
          this.supplierService.deleteById(supplier.id).subscribe({
            next: () => {
              this.refreshSupplierList();
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
