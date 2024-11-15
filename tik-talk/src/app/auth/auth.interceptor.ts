import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { ProfileService } from "../data/services/profile.service";
import { catchError, switchMap, throwError, tap } from "rxjs";
import { AuthService } from './auth.service';

let isRefreshing=false

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
    const cookieService=inject(CookieService)
    const token: string = cookieService.get('token')
    const profileService=inject(ProfileService)
    const authService=inject(AuthService)
    
    if(!token) return next(req)

    req = req.clone({
        setHeaders:{
            Authorization: `Bearer ${token}`
        }
    })


    const refreshAndProcced=(authService: AuthService,
         req: HttpRequest<unknown>,
          next: HttpHandlerFn)=>{
            if(!isRefreshing){
                isRefreshing=true
            return authService.refreshToken()
            .pipe(
                switchMap(()=>{
                    isRefreshing=false
                     return next(req.clone({
                         setHeaders:{
                             Authorization: `Bearer ${token}`
                         }
                     }))
                 })
             )
        }
        
        return next(req)
        
    }

    if(isRefreshing){
        return  refreshAndProcced(authService, req, next)
    }

    
        return next(req).pipe(
            catchError(err=>{
                if(err.status===403) {
                  return  refreshAndProcced(authService, req, next)
                } 
                return throwError(err)
                
            })
        )
}   
    

    

    

    


