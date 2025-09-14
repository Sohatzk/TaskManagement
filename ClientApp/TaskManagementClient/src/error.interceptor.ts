import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 401) {
        if (router.url !== '/login') {
          router.navigate(['/login']);
          return EMPTY;
        }

        return throwError(() => error);
      }

      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else if (Array.isArray(error.error)) {
        errorMessage = error.error.map(err => err.errorMessage).join(', ');
      } else {
        errorMessage = `${error.status}: ${error.message}`;
      }

      toastr.error(errorMessage, error.status.toString());

      return throwError(() => new Error(errorMessage));
    })
  );
};
