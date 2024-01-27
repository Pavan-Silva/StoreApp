import {CanActivateChildFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthorizationService} from "../services/auth/authorization.service";
import {StorageService} from "../services/auth/storage.service";

export const authorizationGuard: CanActivateChildFn = (route) => {
  if (inject(StorageService).isLoggedIn()) {
    const path = route.url[0].path;

    if (path.includes('users')) {
      return inject(AuthorizationService).hasRole('ADMIN');
    }

    else if (path.includes('employees')) {
      return inject(AuthorizationService).hasRole('MANAGER');
    }

    else return true;

  } else {
    inject(Router).navigate(['/login']).then();
    return false;
  }
};
