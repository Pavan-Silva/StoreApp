import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [],
  templateUrl: './access-denied.component.html'
})
export class AccessDeniedComponent {

  constructor(private router:Router) {
  }

  navigateToMainPage() {
    this.router.navigate(['/']).then(() => window.location.reload());
  }
}
