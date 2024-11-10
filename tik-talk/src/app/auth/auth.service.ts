
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap, from } from 'rxjs';
import { AuthInterface } from './auth.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  // token1:string|null=null
  // token=signal("")
  // refreshToken: string|null=null; 

  constructor(private http: HttpClient) {}

  // get isAuth():string|null{
  //   console.log(this.token);
    
  //   return this.token
  // }

  login(payload: { username: string, password: string }):Observable<AuthInterface> {
    const fb=new FormData()
    fb.append('username', payload.username)
    fb.append('password', payload.password)
    return this.http.post<AuthInterface>('https://icherniakov.ru/yt-course/auth/token', fb,)
      .pipe(tap(val=>{
        // this.token1=val.access_token
        // this.token.set(val.access_token),
        // this.refreshToken=val.refresh_token
        // console.log(val.access_token);
        
        document.cookie=(`'token='${val.access_token}`)
        document.cookie=(`'refreshToken='${val.refresh_token}`)
      }))
  }
}
