import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import {
  catchError,
  switchMap,
  throwError,
  tap,
  BehaviorSubject,
  filter,
} from 'rxjs';
import { AuthService } from './auth.service';

let isRefreshing$ = new BehaviorSubject(false);

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const token: string = cookieService.get('token');
  const authService = inject(AuthService);

  authService.refreshToken()



  if (!token) return next(req);

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  const refreshAndProcced = (
    authService: AuthService,
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
  ) => {
    if (!isRefreshing$.value) {
      isRefreshing$.next(true);
     
      
      return authService.refreshToken().pipe(
        switchMap((res) => {
          return next(
            req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.access_token}`,
              },
            })
          ).pipe(tap(() => isRefreshing$.next(false)));
        })
      );
    }

    if (req.url.includes('refresh')) {
        return  next(
        req.clone({
          setHeaders: {
            Authorization: `Bearer ${cookieService.get('token')}`,
          },
        })
      );
    }
    return isRefreshing$.pipe(
      filter((isRefreshing$) => !isRefreshing$),
      switchMap(() => {
        return next(
          req.clone({
            setHeaders: {
              Authorization: `Bearer ${cookieService.get('token')}`,
            },
          })
        );
      })
    );
  };

  if (isRefreshing$.value) {
    return refreshAndProcced(authService, req, next);
  }

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 403) {
     
        
        return refreshAndProcced(authService, req, next);
      }
      return throwError(err);
    })
  );
};
