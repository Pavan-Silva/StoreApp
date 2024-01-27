import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [],
  templateUrl: './not-found-page.component.html'
})
export class NotFoundPageComponent {

  constructor(private router:Router) {
  }

  navigateToMainPage() {
    this.router.navigate(['/']).then();
  }
}
