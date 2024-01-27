import {CanActivateChildFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthorizationService} from "../services/auth/authorization.service";
import {StorageService} from "../services/auth/storage.service";

export const authorizationGuard: CanActivateChildFn = (route) => {
  if (inject(StorageService).isLoggedIn()) {
    const path = route.url[0].path;

    if (path.includes('users')) {
      if (inject(AuthorizationService).hasRole('ADMIN')) return true;
      else {
        inject(Router).navigate(['/access-denied']).then();
        return false;
      }
    }

    else if (path.includes('employees')) {
      if (inject(AuthorizationService).hasRole('MANAGER')) return true;
      else {
        inject(Router).navigate(['/access-denied']).then();
        return false;
      }
    }

    else return true;

  } else {
    inject(Router).navigate(['/login']).then();
    return false;
  }
};
