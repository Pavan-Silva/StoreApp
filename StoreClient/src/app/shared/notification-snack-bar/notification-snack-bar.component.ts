import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-notification-snack-bar',
  standalone: true,
  imports: [
    MatSnackBarLabel,
    MatSnackBarActions,
    MatButtonModule,
    MatSnackBarAction
  ],
  templateUrl: './notification-snack-bar.component.html',
  styles: [
    `
    :host {
      display: flex;
    }
    `,
  ],
})
export class NotificationSnackBarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) protected status:string
  ) {}
}
