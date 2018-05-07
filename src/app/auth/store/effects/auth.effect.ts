import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFireAuth } from 'angularfire2/auth';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map, tap, delay } from 'rxjs/operators';
import { Authenticate, RegisterUser } from '../../models';
import { User } from '../../../user/models';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../../user/services/user.service';
import {
  AuthActionTypes,
  LoadUserInfo,
  LoadUserInfoSuccess,
  Login,
  LoginFailure,
  LoginSuccess,
  Logout,
  Register,
  RegisterFailure,
  RegisterSuccess,
  StoreUserInfoFailure,
  StoreUserInfo,
  StoreUserInfoSuccess
} from '../actions/auth.action';
import { DocumentSnapshot } from '@firebase/firestore-types';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    map((action: Login) => action.payload),
    exhaustMap((authenticate: Authenticate) =>
      this.authService.login(authenticate).pipe(
        map(user => {
          return new LoginSuccess(user.uid);
        }),
        catchError(error => of(new LoginFailure(error.code)))
      )
    )
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    map((action: LoginSuccess) => {
      return new LoadUserInfo(action.payload);
    })
  );

  @Effect()
  register$ = this.actions$.pipe(
    ofType(AuthActionTypes.Register),
    map((action: Register) => action.payload),
    exhaustMap((registerUser: RegisterUser) =>
      this.authService.register(registerUser).pipe(
        map(userCredentials => {
          return new RegisterSuccess({
            uid: userCredentials.user.uid,
            email: registerUser.email,
            firstName: registerUser.firstName,
            lastName: registerUser.lastName,
            displayName: `${registerUser.firstName} ${registerUser.lastName}`
          });
        }),
        catchError(error => {
          return of(new RegisterFailure(error.code));
        })
      )
    )
  );

  @Effect()
  registerSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.RegisterSuccess),
    map((action: RegisterSuccess) => {
      return new StoreUserInfo(action.payload);
    })
  );

  @Effect()
  storeUserInfo$ = this.actions$.pipe(
    ofType(AuthActionTypes.StoreUserInfo),
    map((action: StoreUserInfo) => action.payload),
    exhaustMap((user: User) =>
      this.userService.setUser(user).pipe(
        map(() => {
          return new StoreUserInfoSuccess(user.uid);
        }),
        catchError(error => {
          return of(new StoreUserInfoFailure(error.code));
        })
      )
    )
  );

  @Effect()
  storeUserInfoSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.StoreUserInfoSuccess),
    map((action: StoreUserInfoSuccess) => {
      return new LoadUserInfo(action.payload);
    })
  );

  @Effect()
  loadUserInfo$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoadUserInfo),
    map((action: LoadUserInfo) => action.payload),
    exhaustMap(payload => this.userService.getUser(payload)),
    map((userDocument: DocumentSnapshot) => {
      if (userDocument.exists) {
        /// User logged in
        this.router.navigate(['/']);
        return new LoadUserInfoSuccess(userDocument.data() as User);
      } else {
        /// User not logged in
        // return new Logout();
      }
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    tap(authed => {
      this.router.navigate(['/login']);
      this.authService.logout();
    })
  );
}
