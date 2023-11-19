import { EMPTY, map, of } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { UserLogin } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpService = inject(HttpService);
  private url = 'users';
  get IsLoggedIn() {
    return !!sessionStorage.getItem('userName');
  }
  get UserName() {
    return sessionStorage.getItem('userName');
  }

  register(username: string, password: string) {
    return this.httpService.post(this.url, { username, password }).pipe(
      map((p) => {
        sessionStorage.setItem('userName', username);
        return { username, password };
      })
    );
  }
  login(username: string, password: string) {
    return this.httpService.get<UserLogin[]>(this.url).pipe(
      map((users) => {
        if (
          users.find(
            (user) => user.password === password && user.username === username
          )
        ) {
          sessionStorage.setItem('userName', username);
          return { username, password };
        } else {
          sessionStorage.removeItem('userName');
          return null;
        }
      })
    );
  }

  logout() {
    sessionStorage.clear();
    return of(true);
  }
}
