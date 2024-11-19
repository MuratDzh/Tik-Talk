
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap, from, catchError, throwError } from 'rxjs';
import { AuthInterface } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Profile } from '../data/interfaces/profile.interface';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  // token1:string|null=null
  token=signal('')
  // token=''
  // refreshToken: string|null=null; 

  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) {}

  get isAuth():Boolean{
   return !!this.cookie.get('token')
  }

  login(payload: { username: string, password: string }):Observable<AuthInterface> {
    const fb=new FormData()
    fb.append('username', payload.username)
    fb.append('password', payload.password)
    return this.http.post<AuthInterface>('https://icherniakov.ru/yt-course/auth/token', fb,)
      .pipe(tap(val=>{
        // this.token1=val.access_token
        this.token.set(val.access_token)
        console.log(this.token());
        
        // this.refreshToken=val.refresh_token
        // console.log(val.access_token);
        
        // document.cookie=(`'token='${val.access_token}`)
        // document.cookie=(`'refreshToken='${val.refresh_token}`)

        this.cookie.set('token', val.access_token)
        this.cookie.set('refreshToken', val.refresh_token)
        // console.log(this.cookie.get('token'));
        
      }))
  }

  logout(): Observable<Profile>{
    this.cookie.deleteAll()
    this.router.navigate(['/login'])
    return this.http.get<Profile>('https://icherniakov.ru/yt-course/auth/logout')
  }


  refreshToken():Observable<AuthInterface>{
    return this.http.post<AuthInterface>('https://icherniakov.ru/yt-course/auth/refresh',
     {refresh_token:this.cookie.get('refreshToken')})
     .pipe(
      tap(v=>{

        this.cookie.set('token', v.access_token)
        this.cookie.set('refreshToken', v.refresh_token)
        
      }),
      catchError(err=>{
        this.logout()
        return throwError(err)
      })
     )
  }

}
