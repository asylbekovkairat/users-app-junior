import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { UsersApiService } from '../service/users-api.service';
import { LocaleStorageService } from '../service/localStorage.service';
import { UsersActions } from './users.actions';
import { IUser } from '../model/user.type';

export const loadUsersEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userAPIService = inject(UsersApiService);
    const userLocaleStorageService = inject(LocaleStorageService);

    return actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(() => {
        console.log(
          'userLocaleStorageService.getUsers()',
          userLocaleStorageService.getUsers()
        );

        return userLocaleStorageService.getUsers()
          ? of(
              UsersActions.loadUserFromLocalStorage({
                users: userLocaleStorageService.getUsers()!,
              })
            )
          : userAPIService.loadUser().pipe(
              map((users: IUser[]) => {
                userLocaleStorageService.setUsers(users);
                return UsersActions.loadUsersSuccess({
                  users: users,
                });
              }),
              catchError((error) => {
                return of(UsersActions.loadUsersFailed({ error }));
              })
            );
      })
    );
  },
  { functional: true }
);

export const deleteUserEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userAPIService = inject(UsersApiService);
    const userLocaleStorageService = inject(LocaleStorageService);

    return actions$.pipe(
      ofType(UsersActions.deleteUser),
      switchMap(({ userId }) =>
        userAPIService.deleteUser(userId).pipe(
          map(() => {
            userLocaleStorageService.removeUser(userId);
            return UsersActions.deleteUserSuccess({ userId });
          }),
          catchError((error) => of(UsersActions.deleteUserFailed({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const addUserEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userAPIService = inject(UsersApiService);
    const userLocaleStorageService = inject(LocaleStorageService);

    return actions$.pipe(
      ofType(UsersActions.addUser),
      switchMap(({ userData }) =>
        userAPIService.addUser(userData).pipe(
          map(() => {
            userLocaleStorageService.addUser(userData);
            return UsersActions.addUserSuccess({ userData });
          }),
          catchError((error) => of(UsersActions.addUserFailed({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const updateUserEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userAPIService = inject(UsersApiService);
    const userLocaleStorageService = inject(LocaleStorageService);

    return actions$.pipe(
      ofType(UsersActions.editUser),
      switchMap(({ userData }) =>
        userAPIService.editUser(userData.changes).pipe(
          map(() => {
            userLocaleStorageService.editUser(userData.changes);
            return UsersActions.editUserSuccess({ userData });
          }),
          catchError((error) => of(UsersActions.editUserFailed({ error })))
        )
      )
    );
  },
  { functional: true }
);
