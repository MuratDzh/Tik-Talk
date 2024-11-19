import { Profile } from './../interfaces/profile.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map, take } from 'rxjs';
import { Pagenable } from '../interfaces/subscriber.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private coockie: CookieService,
    private router: Router
  ) {}

  getTestAccount(): Observable<Profile[]> {
    return this.http.get<Profile[]>(
      'https://icherniakov.ru/yt-course/account/test_accounts'
    );
  }

  getMe(): Observable<Profile> {
    return this.http.get<Profile>(
      'https://icherniakov.ru/yt-course/account/me'
    );
  }

  getSubscribers(a = 3): any {
    return this.http
      .get<Partial<Pagenable<Profile[]>>>(
        'https://icherniakov.ru/yt-course/account/subscribers/'
      )
      .pipe(map((res) => res.items?.slice(0, a)));
  }

  getTestAccountId(id: string): Observable<Profile> {
    return this.http.get<Profile>(
      `https://icherniakov.ru/yt-course/account/${id}`
    );
  }

  postMe(me: Partial<Profile>) {
    return this.http.patch<Partial<Profile>>(
      'https://icherniakov.ru/yt-course/account/me',
      me
    );
  }
}
