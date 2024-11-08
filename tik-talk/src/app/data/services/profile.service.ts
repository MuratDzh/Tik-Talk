import { Profile } from './../interfaces/profile.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getTestAccount(): Observable<Profile[]> {
    return this.http.get<Profile[]>(
      'https://icherniakov.ru/yt-course/account/test_accounts'
    );
  }
}
