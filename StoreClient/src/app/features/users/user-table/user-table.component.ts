import {Component, OnInit} from '@angular/core';
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {EmployeeFormDialogComponent} from "../../employees/employee-form-dialog/employee-form-dialog.component";
import {user} from "../../../core/models/user.model";
import {AuthorizationService} from "../../../core/services/auth/authorization.service";
import {UserService} from "../../../core/services/user/user.service";
import {UserFormDialogComponent} from "../user-form-dialog/user-form-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NotificationSnackBarComponent} from "../../../shared/notification-snack-bar/notification-snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorComponent} from "../../../shared/error/error.component";
import {LoadingComponent} from "../../../shared/loading/loading.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    ConfirmDialogComponent,
    EmployeeFormDialogComponent,
    UserFormDialogComponent,
    ErrorComponent,
    LoadingComponent
  ],
  templateUrl: './user-table.component.html'
})
export class UserTableComponent implements OnInit {

  protected hasUpdateAuthority = false;
  protected hasDeleteAuthority = false;

  users:user[] = [];

  isFailed = false;
  isLoading = false;

  currentSearchQuery = '';
  currentSearchParam = '';

  constructor(
    private userService:UserService,
    private authorizationService:AuthorizationService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.hasUpdateAuthority = this.authorizationService.hasAuthority('Users-Update');
    this.hasDeleteAuthority = this.authorizationService.hasAuthority('Users-Delete');

    this.route.queryParams.subscribe((params:any) =>{
      if (params.query && params.filter) {
        this.currentSearchParam = params.filter;
        this.currentSearchQuery = params.query;
        this.searchUsersWithCurrentQuery();
      }

      else this.refreshUserList();
    });
  }

  refreshUserList() {
    this.userService.getAllUsers().subscribe({
      next: data => {
        this.users = data;
        this.isFailed = false;
        this.isLoading = false;
      },

      error: () => {
        this.isFailed = true;
        this.isLoading = false;
      }
    });
  }

  searchUsersWithCurrentQuery() {
    this.isLoading = true;

    this.userService.searchUsers(this.currentSearchQuery, this.currentSearchParam).subscribe({
      next: data => {
        this.users = data;
        this.isFailed = false;
        this.isLoading = false;
      },

      error: () => {
        this.isFailed = true;
        this.isLoading = false;
      }
    });
  }

  showEditDialog(user:user) {
    this.dialog.open(UserFormDialogComponent, {data:user.id})
      .afterClosed().subscribe((res:boolean) => {
        if (res) this.refreshUserList();
    });
  }

  deleteUser(user:user) {
    const operation = "Delete '" + user.employee.callingName + "'";

    this.dialog.open(ConfirmDialogComponent, {data:operation})
      .afterClosed().subscribe((res:boolean) => {
      if (res) {
        if (user.id) {
          this.userService.deleteUserById(user.id).subscribe({
            next: () => {
              this.refreshUserList();
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

  handleResult(status:string) {
    this.snackBar.openFromComponent(NotificationSnackBarComponent, {
      duration: 3000,
      horizontalPosition: "right",
      data: status
    });
  }
}
