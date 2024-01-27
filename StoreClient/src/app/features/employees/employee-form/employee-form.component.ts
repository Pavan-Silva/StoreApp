import {Component, Inject, OnInit} from '@angular/core';
import {EmployeeService} from "../../../core/services/employee/employee.service";
import {employee} from "../../../core/models/employee.model";
import {UserFormComponent} from "../../users/user-form/user-form.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DesignationService} from "../../../core/services/employee/designation.service";
import {EmployeeStatusService} from "../../../core/services/employee/employee-status.service";
import {designation} from "../../../core/models/designation.model";
import {employeeStatus} from "../../../core/models/employee-status.model";
import {gender} from "../../../core/models/gender.model";
import {GenderService} from "../../../core/services/employee/gender.service";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {NgOptimizedImage} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationSnackBarComponent} from "../../../shared/notification-snack-bar/notification-snack-bar.component";

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    UserFormComponent,
    ReactiveFormsModule,
    ConfirmDialogComponent,
    NgOptimizedImage,
    MatDialogClose,
    MatDialogContent
  ],
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;

  isLoading= false;

  employeeImage: any = null;
  currentOperation = '';
  currentEmployee = <employee>({});

  designationList: designation[] = [];
  employeeStatusList: employeeStatus[] = [];
  genderList: gender[] = [];

  protected formFieldList: string[] = [
    'empNo',
    'address',
    'doAssigned',
    'doBirth',
    'firstName',
    'lastName',
    'land',
    'mobile',
    'nic',
    'empStatus',
    'gender',
    'description',
    'designation'
  ];

  protected isValid = {
    firstName : true,
    lastName : true,
    nic : true,
    address : true,
    mobile: true,
    land: true,
    empNo: true,
    gender: true,
    designation: true,
    empStatus: true,
    doAssigned: true,
    doBirth: true,
    description: true
  }

  constructor(
    private employeeService: EmployeeService,
    private designationService: DesignationService,
    private employeeStatusService: EmployeeStatusService,
    private genderService: GenderService,
    private formBuilder: FormBuilder,
    private dialog:MatDialog,
    private dialogRef:MatDialogRef<EmployeeFormComponent>,
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private currentEmpNo:string,
  ) {
    this.employeeForm = this.formBuilder.group({
      empNo: [
        null,
        [Validators.required, Validators.pattern(/^E[0-9]{6}$/)]
      ],

      firstName: [
        null,
        [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}$/)]
      ],

      lastName: [
        null,
        [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}$/)]
      ],

      nic: [
        null,
        [Validators.required, Validators.pattern(/^([0-9]{9}[xXvV]|[0-9]{12})$/)]
      ],

      address: [null, Validators.required],

      mobile: [
        null,
        [Validators.required, Validators.pattern(/^0[0-9]{9}$/)]
      ],

      land: [
        null,
        [Validators.required, Validators.pattern(/^011[0-9]{7}$/)]
      ],

      description: [null],

      doBirth: [
        null,
        Validators.required
      ],

      doAssigned: [
        null,
        Validators.required
      ],

      gender: [
        'default',
        Validators.required
      ],

      designation: [
        'default',
        Validators.required
      ],

      empStatus: [
        'default',
        Validators.required
      ]
    });
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.designationService.getAllDesignations().subscribe({
      next: data => this.designationList = data,
      error: () => this.handleResult('failed')
    });

    this.employeeStatusService.getStatusList().subscribe({
      next: data => this.employeeStatusList = data,
      error: () => this.handleResult('failed')
    });

    this.genderService.getGenderList().subscribe({
      next: data => this.genderList = data,
      error: () => this.handleResult('failed')
    });

    if (this.currentEmpNo) {
      this.employeeService.getEmployeeByEmpNo(this.currentEmpNo).subscribe({
        next: data => {
          this.currentEmployee = data;
          this.autofillForm();
          this.isLoading = false;
        },

        error: () => this.handleResult('failed')
      });

    } else {
      this.currentOperation = 'Add Employee';
      this.isLoading = false;
    }
  }

  autofillForm() {
    if (this.currentEmployee.photo) {
      this.employeeImage = this.urlToImage(this.currentEmployee.photo);
    }

    this.employeeForm.setValue({
      firstName: this.currentEmployee.callingName,
      lastName: this.currentEmployee.fullName.split(' ')[1],
      nic: this.currentEmployee.nic,
      address: this.currentEmployee.address,
      mobile: this.currentEmployee.mobile,
      land: this.currentEmployee.land,
      empNo: this.currentEmployee.empNo,
      gender: this.currentEmployee.gender.id,
      designation: this.currentEmployee.designation.id,
      empStatus: this.currentEmployee.employeeStatus.id,
      doAssigned: this.currentEmployee.doAssignment,
      doBirth: this.currentEmployee.doBirth,
      description: this.currentEmployee.description
    });

    this.currentOperation = 'Update' + " '" + this.currentEmployee.callingName + "'";
  }

  setEmployeeImagePreview(event:any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => this.employeeImage = reader.result;
      reader.readAsDataURL(file);
    }
  }

  urlToImage(url:string) {
    return 'data:image/jpeg;base64,' + url;
  }

  showConfirmationDialog() {
    this.dialog.open(ConfirmDialogComponent, {data:this.currentOperation})
      .afterClosed().subscribe(res => {
      if (res) this.handleSubmit();
    });
  }

  handleSubmit() {
    if (this.employeeForm.valid) {
      const pendingEmployee = {
        photo: this.employeeImage.split(',')[1],
        empNo: this.employeeForm.controls['empNo'].value,
        address: this.employeeForm.controls['address'].value,
        callingName: this.employeeForm.controls['firstName'].value,
        doAssignment: this.employeeForm.controls['doAssigned'].value,
        doBirth: this.employeeForm.controls['doBirth'].value,
        land: this.employeeForm.controls['land'].value,
        mobile: this.employeeForm.controls['mobile'].value,
        nic: this.employeeForm.controls['nic'].value,
        description: this.employeeForm.controls['description'].value,

        designation: {id: parseInt(this.employeeForm.controls['designation'].value)},
        employeeStatus: {id: parseInt(this.employeeForm.controls['empStatus'].value)},
        gender: {id: parseInt(this.employeeForm.controls['gender'].value)},

        fullName: this.employeeForm.controls['firstName'].value + ' ' + this.employeeForm.controls['lastName'].value
      }

      if (this.currentOperation.includes('Add')) this.saveEmployee(pendingEmployee);
      if (this.currentOperation.includes('Update') && this.currentEmployee.id) this.updateEmployee(pendingEmployee);
    }

    this.formFieldList.map(field => {
      if (!this.employeeForm.controls[field].valid) { (this.isValid as any)[field] = false }
    });
  }

  private updateEmployee(employee:employee) {
    employee.id = this.currentEmployee.id;

    this.employeeService.updateEmployee(employee).subscribe({
      next: () => {
        this.handleResult('success');
      },

      error: () => {
        this.handleResult('failed');
      }
    });

  }

  private saveEmployee(employee:employee) {
    this.employeeService.saveEmployee(employee).subscribe({
      next: () => {
        this.handleResult('success');
      },

      error: () => {
        this.handleResult('failed');
      }
    });
  }

  generateEmpNo() {
    this.employeeForm.controls['empNo'].setValue('E' + ('' + Math.random()).substring(2, 8));
  }

  clearForm() {
    this.employeeForm.reset();
    this.employeeForm.controls['gender'].setValue('default');
    this.employeeForm.controls['empStatus'].setValue('default');
    this.employeeForm.controls['designation'].setValue('default');

    this.employeeImage = null;
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
