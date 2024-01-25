import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {Location, NgOptimizedImage} from "@angular/common";
import {StorageService} from "../../core/services/auth/storage.service";
import {user} from "../../core/models/user.model";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {AuthenticationService} from "../../core/services/auth/authentication.service";
import {AuthorizationService} from "../../core/services/auth/authorization.service";

@Component({
  selector: 'app-main-window',
  standalone: true,
  imports: [
    RouterOutlet,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    ToolbarComponent,
  ],
  templateUrl: './main-window.component.html',
})
export class MainWindowComponent implements OnInit {

  currentModule = 'Dashboard';

  protected user = <user>({username: '', employee: {photo: ''}});
  protected isAdminUser = false;
  protected isManager = false;

  constructor(
    private storageService:StorageService,
    private location:Location,
    private authService:AuthenticationService,
    private authorizationService:AuthorizationService
  ) {}

  ngOnInit(): void {
    const user = this.storageService.getUser();

    if (user.id) this.user = user;
    else this.logOut();

    if (this.authorizationService.hasRole('ADMIN')) this.isAdminUser = true;
    if (this.authorizationService.hasRole('MANAGER')) this.isAdminUser = true;
    this.setModuleByPath();
  }

  logOut() {
    this.authService.logout();
    this.storageService.logOut();
    location.reload();
  }

  setModuleByPath(){
    const path = this.location.path().split('?')[0];
    this.currentModule = path.charAt(1).toUpperCase() + path.slice(2);
  }
}
