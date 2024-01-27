import {Routes} from '@angular/router';
import {MainWindowComponent} from "./shared/main-window/main-window.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {authenticationGuard} from "./core/interceptors/authentication.guard";
import {authorizationGuard} from "./core/interceptors/authorization.guard";
import {EmployeeListComponent} from "./features/employees/employee-list/employee-list.component";
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {UserListComponent} from "./features/users/user-list/user-list.component";
import {ItemListComponent} from "./features/items/item-list/item-list.component";
import {
  PurchaseOrderListComponent
} from "./features/purchase-order/purchase-order-list/purchase-order-list.component";
import {SupplierListComponent} from "./features/suppliers/supplier-list/supplier-list.component";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {AccessDeniedComponent} from "./pages/access-denied/access-denied.component";

export const routes: Routes = [
  { path:'login', component:LoginPageComponent},
  { path: '', redirectTo:'dashboard', pathMatch:'full'},
  {
    path:'',
    component:MainWindowComponent,
    canActivate: [authenticationGuard],
    canActivateChild: [authorizationGuard],
    children: [
      { path: 'orders', component:PurchaseOrderListComponent},
      { path: 'employees', component:EmployeeListComponent },
      { path: 'dashboard', component:DashboardComponent },
      { path: 'users', component:UserListComponent },
      { path: 'items', component:ItemListComponent },
      { path: 'suppliers', component:SupplierListComponent },
      { path: 'access-denied', component:AccessDeniedComponent }
    ]
  },
  { path: '**', component:NotFoundPageComponent },
];
