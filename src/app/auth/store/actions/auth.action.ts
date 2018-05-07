import { Action } from '@ngrx/store';

import { Authenticate, RegisterUser } from '../../models';
import { User } from '../../../user/models';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Register = '[Auth] Register',
  RegisterSuccess = '[Auth] Register Success',
  RegisterFailure = '[Auth] Register Failure',
  Logout = '[Auth] Logout',
  LoadUserInfo = '[Auth] Load User Info',
  LoadUserInfoSuccess = '[Auth] Load User Info Success',
  LoadUserInfoFailure = '[Auth] Load User Info Failure',
  StoreUserInfo = '[Auth] Store User Info',
  StoreUserInfoSuccess = '[Auth] Store User Info Success',
  StoreUserInfoFailure = '[Auth] Store User Info Failure'
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Authenticate) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  /**
   *
   * @param payload: Uid.
   */
  constructor(public payload: string) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class Register implements Action {
  readonly type = AuthActionTypes.Register;

  constructor(public payload: RegisterUser) {}
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.RegisterSuccess;
  constructor(public payload: User) {}
}

export class RegisterFailure implements Action {
  readonly type = AuthActionTypes.RegisterFailure;

  constructor(public payload: any) {}
}

export class LoadUserInfo implements Action {
  readonly type = AuthActionTypes.LoadUserInfo;

  /**
   *
   * @param payload: Uid.
   */
  constructor(public payload: string) {}
}

export class LoadUserInfoSuccess implements Action {
  readonly type = AuthActionTypes.LoadUserInfoSuccess;

  constructor(public payload: User) {}
}

export class LoadUserInfoFailure implements Action {
  readonly type = AuthActionTypes.LoadUserInfoFailure;

  constructor(public payload: any) {}
}

export class StoreUserInfo implements Action {
  readonly type = AuthActionTypes.StoreUserInfo;

  constructor(public payload: User) {}
}

export class StoreUserInfoSuccess implements Action {
  readonly type = AuthActionTypes.StoreUserInfoSuccess;

  constructor(public payload: string) {}
}

export class StoreUserInfoFailure implements Action {
  readonly type = AuthActionTypes.StoreUserInfoFailure;

  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | Register
  | RegisterSuccess
  | RegisterFailure
  | LoadUserInfo
  | LoadUserInfoSuccess
  | LoadUserInfoFailure
  | StoreUserInfo
  | StoreUserInfoSuccess
  | StoreUserInfoFailure
  | Logout;
