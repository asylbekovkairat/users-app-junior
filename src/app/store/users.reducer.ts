import { createReducer, on } from '@ngrx/store';
import { IUser } from '../model/user.type';
import { UsersActions } from './users.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export const USERS_FEATURE_KEY = 'users';

export type LoadingStatus = 'init' | 'loading' | 'success' | 'error';

export interface IUsersState extends EntityState<IUser> {
  selectedId?: string | number;
  status: LoadingStatus;
  error: unknown;
}

export const usersAdapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();

const initialState: IUsersState = usersAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) =>
    usersAdapter.setAll(users, { ...state, status: 'success' as const })
  ),
  on(UsersActions.loadUsersFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(UsersActions.loadUserFromLocalStorage, (state, { users }) =>
    usersAdapter.setAll(users, { ...state, status: 'success' as const })
  ),

  on(UsersActions.deleteUser, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UsersActions.deleteUserSuccess, (state, { userId }) =>
    usersAdapter.removeOne(userId, { ...state, status: 'success' as const })
  ),
  on(UsersActions.deleteUserFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),

  on(UsersActions.editUser, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UsersActions.editUserSuccess, (state, { userData }) =>
    usersAdapter.updateOne(userData, { ...state, status: 'success' as const })
  ),
  on(UsersActions.editUserFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),

  on(UsersActions.addUser, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UsersActions.addUserSuccess, (state, { userData }) =>
    usersAdapter.addOne(userData, { ...state, status: 'success' as const })
  ),
  on(UsersActions.addUserFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  }))
);
