import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {user} from "../../core/models/user.model";
import {UserFormComponent} from "../../features/users/user-form/user-form.component";
import {
  EmployeeFormComponent
} from "../../features/employees/employee-form/employee-form.component";
import {AuthorizationService} from "../../core/services/auth/authorization.service";
import {MatDialog} from "@angular/material/dialog";
import {ItemFormComponent} from "../../features/items/item-form/item-form.component";
import {
  SupplierFormComponent
} from "../../features/suppliers/supplier-form/supplier-form.component";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {
  PurchaseOrderFormComponent
} from "../../features/purchase-order/purchase-order-form/purchase-order-form.component";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    UserFormComponent,
    EmployeeFormComponent,
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
    else this.userRole = this.user.roles[0].name.charAt(0) + this.user.roles[0].name.slice(1).toLowerCase();
  }

  openFormDialog() {
    if (this.currentModule === 'Employees') {
      this.dialog.open(EmployeeFormComponent)
        .afterClosed().subscribe((refresh:boolean) => {
          if (refresh) this.navigateToMainPage();
      });
    }

    else if (this.currentModule === 'Users') {
      this.dialog.open(UserFormComponent)
        .afterClosed().subscribe((refresh:boolean) => {
        if (refresh) this.navigateToMainPage();
      });
    }

    else if (this.currentModule === 'Items') {
      this.dialog.open(ItemFormComponent)
        .afterClosed().subscribe((refresh:boolean) => {
        if (refresh) this.navigateToMainPage();
      });
    }

    else if (this.currentModule === 'Suppliers') {
      this.dialog.open(SupplierFormComponent)
        .afterClosed().subscribe((refresh:boolean) => {
        if (refresh) this.navigateToMainPage();
      });
    }

    else if (this.currentModule === 'Orders') {
      this.dialog.open(PurchaseOrderFormComponent)
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
