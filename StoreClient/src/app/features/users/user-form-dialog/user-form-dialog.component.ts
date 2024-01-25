import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {role} from "../../../core/models/role.model";
import {RoleService} from "../../../core/services/user/role.service";
import {UserService} from "../../../core/services/user/user.service";
import {user} from "../../../core/models/user.model";
import {UserStatusService} from "../../../core/services/user/user-status.service";
import {userStatus} from "../../../core/models/user-status.model";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {EmployeeService} from "../../../core/services/employee/employee.service";
import {employee} from "../../../core/models/employee.model";
import {NotificationSnackBarComponent} from "../../../shared/notification-snack-bar/notification-snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ConfirmDialogComponent,
    MatDialogClose
  ],
  templateUrl: './user-form-dialog.component.html'
})
export class UserFormDialogComponent implements OnInit {

  userForm: FormGroup;
  newRoleForm: FormGroup;
  roleForm: FormGroup;

  roleList: role[] = [];
  userStatusList: userStatus[] = [];
  userRoleList: role[] = [];

  isNewRoleFormEnabled = false;
  isLoading = true;

  currentOperation = '';
  currentUser = <user>({});

  constructor(
    private employeeService:EmployeeService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userStatusService: UserStatusService,
    private dialogRef:MatDialogRef<UserFormDialogComponent>,
    private snackBar:MatSnackBar,
    private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) private currentUserId:number
  ) {
    this.userForm = this.formBuilder.group({
      username: [
        null,
        [Validators.required, Validators.min(4), Validators.pattern(/^[A-Za-z0-9]{4,}$/)]
      ],

      password: [
        null,
        [Validators.required, Validators.pattern(/^[A-Za-z0-9]{8,}$/)]
      ],

      empNo: [
        null,
        [Validators.required, Validators.pattern(/^E[0-9]{6}$/)]
      ],

      userStatus: [
        'default',
        [Validators.required, Validators.pattern(/^[0-9]*$/)]
      ],
    });

    this.roleForm = this.formBuilder.group({
      role: [
        'default',
        [Validators.required, Validators.pattern(/^[0-9]*$/)]
      ]
    });

    this.newRoleForm = this.formBuilder.group({
      roleName: [
        {value:null, disabled:true},
        [Validators.required, Validators.pattern(/^[A-Za-z]*$/)]
      ],

      module: [
        {value:'default', disabled:true},
        [Validators.required, Validators.pattern(/^[0-9]*$/)]
      ],

      operation: [
        {value:'default', disabled:true},
        [Validators.required, Validators.pattern(/^[0-9]*$/)]
      ],
    });
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.roleService.getRoleList().subscribe({
      next: data => this.roleList = data,
      error: () => this.handleResult('failed')
    });

    this.userStatusService.getUserStatusList().subscribe({
      next: data => this.userStatusList = data,
      error: () => this.handleResult('failed')
    });

    if (this.currentUserId) {
      this.userService.getUserById(this.currentUserId).subscribe({
        next: data => {
          this.currentUser = data;
          this.autofillForm();
          this.isLoading = false;
        },

        error: () => this.handleResult('failed')
      });

    } else {
      this.currentOperation = 'Create';
      this.isLoading = false;
    }
  }

  autofillForm() {
    this.userRoleList = this.currentUser.roles;

    this.userForm.setValue({
      username: this.currentUser.username,
      password: null,
      empNo: this.currentUser.employee.empNo,
      userStatus: this.currentUser.userStatus.id
    });

    this.currentOperation = 'Update' + " '" + this.currentUser.username + "'";
  }

  showConfirmationDialog() {
    this.dialog.open(ConfirmDialogComponent, {data:this.currentOperation})
      .afterClosed().subscribe(res => {
      if (res) this.handleSubmit();
    });
  }

  handleSubmit() {
    if (this.userForm.valid) {
      let employee = <employee>({});

      this.employeeService.getEmployeeByEmpNo(this.userForm.controls['empNo'].value).subscribe({
        next: data => employee = data,
        error: () => this.handleResult('failed')
      });

      const pendingUser : user = {
        employee: employee,
        username: this.userForm.controls['username'].value,
        password: this.userForm.controls['password'].value,
        roles: this.userRoleList,
        userStatus: {id: parseInt(this.userForm.controls['userStatus'].value)},
      }
      console.log(pendingUser)

      if (this.currentUser && this.currentOperation.includes('Update')) {
        pendingUser.id = this.currentUser.id;
        this.saveUser(pendingUser);
      }

      else this.saveUser(pendingUser);
    }
  }

  private saveUser(user:user) {
    this.userService.saveUser(user).subscribe({
      next: () => this.handleResult('success'),
      error: (error) => {
        console.log(error)
        this.handleResult('failed');
      }
    });
  }

  addRoleToList() {
    const roleId = this.roleForm.controls['role'].value;

    if (this.roleForm.valid) {
      const role = this.roleList.filter(r =>  r.id === parseInt(roleId))[0];

      if (!this.userRoleList.some(r => r.name === role.name)) {
        this.userRoleList = [...this.userRoleList, role];
      }
    }
  }

  removeFromRoleList(roleId:number) {
    this.userRoleList = this.userRoleList.filter(r => r.id !== roleId);
  }

  toggleCustomRoleForm() {
    if (this.isNewRoleFormEnabled) {
      this.newRoleForm.disable();
      this.isNewRoleFormEnabled = false;
    }

    else {
      this.newRoleForm.enable();
      this.isNewRoleFormEnabled = true;
    }
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
