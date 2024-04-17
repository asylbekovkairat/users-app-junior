import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from '../model/user.type';
import { Update } from '@ngrx/entity';

export const UsersActions = createActionGroup({
  source: 'Users Page',
  events: {
    loadUsers: emptyProps(),
    loadUsersSuccess: props<{ users: IUser[] }>(),
    loadUsersFailed: props<{ error: unknown }>(),
    loadUserFromLocalStorage: props<{ users: IUser[] }>(),

    addUser: props<{ userData: IUser }>(),
    addUserSuccess: props<{ userData: IUser }>(),
    addUserFailed: props<{ error: unknown }>(),

    editUser: props<{ userData: Update<IUser> }>(),
    editUserSuccess: props<{ userData: Update<IUser> }>(),
    editUserFailed: props<{ error: unknown }>(),

    deleteUser: props<{ userId: number }>(),
    deleteUserSuccess: props<{ userId: number }>(),
    deleteUserFailed: props<{ error: unknown }>(),
  },
});
