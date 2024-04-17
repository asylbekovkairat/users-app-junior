import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UsersSelectors from './users.selector';
import { UsersActions } from './users.actions';
import { IUser } from '../model/user.type';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  private readonly store = inject(Store);

  public readonly users$ = this.store.select(UsersSelectors.selectAllUsers);
  public readonly status$ = this.store.select(UsersSelectors.selectUsersStatus);
  public readonly error$ = this.store.select(UsersSelectors.selectUsersError);

  loadUsers() {
    this.store.dispatch(UsersActions.loadUsers());
  }

  deleteUser(userId: number) {
    this.store.dispatch(UsersActions.deleteUser({ userId }));
  }

  addUser(userData: IUser) {
    this.store.dispatch(UsersActions.addUser({ userData }));
  }

  editUser(user: IUser) {
    this.store.dispatch(
      UsersActions.editUser({ userData: { id: user.id, changes: user } })
    );
  }
}
