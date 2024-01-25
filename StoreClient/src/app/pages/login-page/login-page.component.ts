import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../core/services/auth/authentication.service";
import {StorageService} from "../../core/services/auth/storage.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;

  isLoading = false;
  isFailed = false;
  isUsernameValid = true;
  isPasswordValid = true;

  error = '';

  constructor(
    private authService:AuthenticationService,
    private storageService:StorageService,
    private router:Router,
    private formBuilder:FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [Validators.required]
      ],

      password: [
        '',
        [Validators.required]
      ]
    })
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      window.alert('User Already Logged In, If you need to log in again please log out first.');
      this.router.navigate(['/']).then();
    }
  }

  onSubmit() {
    this.isLoading = true;

    if (this.loginForm.valid) {
      const username = this.loginForm.controls['username'].value;
      const password = this.loginForm.controls['password'].value;

      this.authService.login(username, password).subscribe({
        next: (data:any) => {
          this.storageService.saveUser(data.user);
          this.storageService.saveUserAuthorities(data["authorities"]);

          this.isLoading = false;
          this.isFailed = false;
          this.loginForm.reset();

          this.router.navigate(['/']).then();
        },

        error: () => {
          this.isLoading = false;
          this.isFailed = true;
          this.error = 'Something went wrong';
        }
      });

    } else {
      this.isLoading = false;
      this.isUsernameValid = this.loginForm.controls['username'].valid;
      this.isPasswordValid = this.loginForm.controls['password'].valid;
    }
  }
}
