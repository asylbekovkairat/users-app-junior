import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { USERS_API } from '../app.config';
import { IUser } from '../model/user.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private http = inject(HttpClient);
  private url = inject(USERS_API);
  constructor() {}

  public loadUser() {
    return this.http.get<IUser[]>(`${this.url}/users`);
  }

  public deleteUser(userId: number) {
    return this.http.delete(`${this.url}/users/${userId}`);
  }

  public addUser(user: IUser): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.url + '/users', user);
  }

  public editUser(user: Partial<IUser>): Observable<IUser> {
    return this.http.patch<IUser>(this.url + `/users/${user.id}`, user);
  }
}
