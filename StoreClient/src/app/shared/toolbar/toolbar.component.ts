import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {user} from "../../core/models/user.model";
import {UserFormDialogComponent} from "../../features/users/user-form-dialog/user-form-dialog.component";
import {
  EmployeeFormDialogComponent
} from "../../features/employees/employee-form-dialog/employee-form-dialog.component";
import {AuthorizationService} from "../../core/services/auth/authorization.service";
import {MatDialog} from "@angular/material/dialog";
import {ItemFormDialogComponent} from "../../features/items/item-form-dialog/item-form-dialog.component";
import {
  SupplierFormDialogComponent
} from "../../features/suppliers/supplier-form-dialog/supplier-form-dialog.component";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {
  PurchaseOrderFormDialogComponent
} from "../../features/purchase-order/purchase-order-form-dialog/purchase-order-form-dialog.component";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    UserFormDialogComponent,
    EmployeeFormDialogComponent,
    FormsModule
  ],
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit, OnChanges {

  protected isFormEnabled = false;
  protected userRole: string | undefined;

  isInSearch = false;

  @Input() currentModule = '';
  @Input() user: user = <user>({username: '', employee: {photo: ''}});
  @Output() logoutEvent = new EventEmitter();

  constructor(
    private authorizationService: AuthorizationService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnChanges(): void {
    this.isInSearch = this.router.url.includes('?');
  }

  ngOnInit(): void {
    this.isFormEnabled = this.authorizationService.hasAuthority(this.currentModule + '-Write');

    if (this.authorizationService.hasRole('ADMIN')) this.userRole = 'Admin';
    else if (this.authorizationService.hasRole('MANAGER')) this.userRole = 'Manager';
    else this.userRole = this.user.roles[0].name;
  }

  openFormDialog() {
    if (this.currentModule === 'Employees') {
      this.dialog.open(EmployeeFormDialogComponent)
        .afterClosed().subscribe((refresh:boolean) => {
          if (refresh) this.navigateToMainPage();
      });
    }

    else if (this.currentModule === 'Users') {
      this.dialog.open(UserFormDialogComponent)
        .afterClosed().subscribe((refresh:boolean) => {
        if (refresh) this.navigateToMainPage();
      });
    }

    else if (this.currentModule === 'Items') {
      this.dialog.open(ItemFormDialogComponent)
        .afterClosed().subscribe((refresh:boolean) => {
        if (refresh) this.navigateToMainPage();
      });
    }

    else if (this.currentModule === 'Suppliers') {
      this.dialog.open(SupplierFormDialogComponent)
        .afterClosed().subscribe((refresh:boolean) => {
        if (refresh) this.navigateToMainPage();
      });
    }

    else if (this.currentModule === 'Orders') {
      this.dialog.open(PurchaseOrderFormDialogComponent)
        .afterClosed().subscribe((refresh:boolean) => {
        if (refresh) this.navigateToMainPage();
      });
    }
  }

  handleSearch(query:string, filter:string) {
    if (query && filter) {
      this.router.navigate(['/' + this.currentModule.toLowerCase()], {
        queryParams:{filter:filter, query:query}
      }).then(() => { this.isInSearch = true});
    }
  }

  navigateToMainPage() {
    this.router.navigate([this.router.url.split('?')[0]]).then(() => {
      window.location.reload();
    });
  }

  logOut() {
    this.logoutEvent.next(null);
  }
}
