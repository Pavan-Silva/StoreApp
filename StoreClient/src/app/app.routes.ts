import {Routes} from '@angular/router';
import {MainWindowComponent} from "./shared/main-window/main-window.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {authenticationGuard} from "./core/interceptors/authentication.guard";
import {authorizationGuard} from "./core/interceptors/authorization.guard";
import {EmployeeTableComponent} from "./features/employees/employee-table/employee-table.component";
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {UserTableComponent} from "./features/users/user-table/user-table.component";
import {ItemTableComponent} from "./features/items/item-table/item-table.component";
import {
  PurchaseOrderTableComponent
} from "./features/purchase-order/purchase-order-table/purchase-order-table.component";
import {SupplierTableComponent} from "./features/suppliers/supplier-table/supplier-table.component";

export const routes: Routes = [
  {path:'login', component:LoginPageComponent},
  { path: '', redirectTo:'dashboard', pathMatch:'full'},
  {
    path:'',
    component:MainWindowComponent,
    canActivate: [authenticationGuard],
    canActivateChild: [authorizationGuard],
    children: [
      { path: 'orders', component:PurchaseOrderTableComponent},
      { path: 'employees', component:EmployeeTableComponent },
      { path: 'dashboard', component:DashboardComponent },
      { path: 'users', component:UserTableComponent },
      { path: 'items', component:ItemTableComponent },
      { path: 'suppliers', component:SupplierTableComponent }
    ]
  },
];
