import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {catchError, switchMap, throwError} from "rxjs";
import {AuthenticationService} from "../services/auth/authentication.service";
import {StorageService} from "../services/auth/storage.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let isRefreshing = false;

  const router = inject(Router);
  const storageService = inject((StorageService));
  const authService = inject(AuthenticationService);

  req = req.clone({withCredentials:true});

  return next(req).pipe(
    catchError<any,any>(error => {
      if (error.status === 403 && !req.url.includes('auth/login') && error instanceof HttpErrorResponse) {
        if (!isRefreshing) {
          isRefreshing = true;

          return authService.refreshToken().pipe(
            switchMap(() => {
              isRefreshing = false;
              return next(req);
            }),

            catchError(error => {
              isRefreshing = false;

              if (error.status == '403') {
                storageService.logOut();
                router.navigate(['/login']).then();
              }

              return throwError(() => error);
            })
          );
        }
      }
      return throwError(() => error);
    })
  );
};
