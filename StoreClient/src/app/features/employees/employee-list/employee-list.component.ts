import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {EmployeeService} from "../../../core/services/employee/employee.service";
import {employee} from "../../../core/models/employee.model";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {EmployeeFormComponent} from "../employee-form/employee-form.component";
import {AuthorizationService} from "../../../core/services/auth/authorization.service";
import {MatDialog} from "@angular/material/dialog";
import {NotificationSnackBarComponent} from "../../../shared/notification-snack-bar/notification-snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorComponent} from "../../../shared/error/error.component";
import {PageLoadingComponent} from "../../../shared/page-loading/page-loading.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ConfirmDialogComponent,
    EmployeeFormComponent,
    ErrorComponent,
    PageLoadingComponent
  ],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {

  protected hasUpdateAuthority = false;
  protected hasDeleteAuthority = false;

  employees: employee[] = [];

  isFailed = false;
  isLoading = false;

  currentSearchQuery = '';
  currentSearchParam = '';

  constructor(
    private employeeService:EmployeeService,
    private authorizationService:AuthorizationService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.hasUpdateAuthority = this.authorizationService.hasAuthority('Employees-Update');
    this.hasDeleteAuthority = this.authorizationService.hasAuthority('Employees-Delete');

    this.route.queryParams.subscribe((params:any) =>{
      if (params.query && params.filter) {
        this.currentSearchParam = params.filter;
        this.currentSearchQuery = params.query;
        this.searchEmployeesWithCurrentQuery();
      }

      else this.refreshEmployeeList();
    });
  }

  refreshEmployeeList() {
    if (this.currentSearchQuery) {
      this.searchEmployeesWithCurrentQuery();

    } else {
      this.employeeService.getAllEmployees().subscribe({
        next: data => {
          this.employees = data;
          this.isFailed = false;
          this.isLoading = false;
        },

        error: () => {
          this.isFailed = true;
          this.isLoading = false;
        }
      });
    }
  }

  searchEmployeesWithCurrentQuery() {
    this.isLoading = true;

    this.employeeService.searchEmployees(this.currentSearchQuery, this.currentSearchParam).subscribe({
      next: data => {
        this.employees = data;
        this.isFailed = false;
        this.isLoading = false;
      },

      error: () => {
        this.isFailed = true;
        this.isLoading = false;
      }
    });
  }

  showFormDialog(employee:employee) {
    this.dialog.open(EmployeeFormComponent, {data:employee.empNo})
      .afterClosed().subscribe((refresh:boolean) => {
        if (refresh) this.refreshEmployeeList();
    });
  }

  protected deleteEmployee(employee:employee) {
    const operation = "Delete '" + employee.callingName + "'";

    this.dialog.open(ConfirmDialogComponent, {data:operation})
      .afterClosed().subscribe( (res:boolean) => {
      if (res) {
        this.employeeService.deleteEmployee(employee.empNo).subscribe({
          next: () => {
            this.refreshEmployeeList();
            this.handleResult('success');
          },

          error: () => {
            this.handleResult('failed');
          }
        });
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
