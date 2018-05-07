import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { marbles } from 'rxjs-marbles';
import { Observable } from 'rxjs/Observable';
// import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/of';
import { empty } from 'rxjs/observable/empty';
import { defaultServiceImports } from '../../../spec.imports';
import { User } from '../../../user/models';
import { AuthService } from '../../services/auth.service';
import * as fromAuthActions from '../actions/auth.action';
import * as fromAuthEffects from './auth.effect';
import { UserService } from '../../../user/services';
import { DocumentSnapshot } from '@firebase/firestore-types';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('AuthEffects', () => {
  let actions$: TestActions;
  let authService: AuthService;
  let userService: UserService;
  let effects: fromAuthEffects.AuthEffects;

  const user: User = {
    uid: '1234',
    displayName: 'Roboto'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...defaultServiceImports,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthService,
        UserService,
        fromAuthEffects.AuthEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });

    actions$ = TestBed.get(Actions);
    authService = TestBed.get(AuthService);
    userService = TestBed.get(UserService);
    effects = TestBed.get(fromAuthEffects.AuthEffects);

    jest.spyOn(authService, 'login').mockReturnValue(Observable.of({}));
    jest.spyOn(userService, 'getUser').mockReturnValue(Observable.of({}));
  });

  describe('login', () => {
    test(
      'should return LoginSuccess observable',
      marbles(m => {
        jest
          .spyOn(authService, 'login')
          .mockReturnValue(Observable.of({ uid: '1234' }));

        const action = new fromAuthActions.Login({
          email: 'Hello',
          password: 'World'
        });
        const completion = new fromAuthActions.LoginSuccess('1234');

        actions$.stream = m.hot('-a', { a: action });
        const expected = m.cold('-b', { b: completion });

        m.expect(effects.login$).toBeObservable(expected);
      })
    );
  });

  describe('loginSuccess', () => {
    test(
      'should return LoadUser Observable',
      marbles(m => {
        const action = new fromAuthActions.LoginSuccess('123');
        const completion = new fromAuthActions.LoadUserInfo('123');

        actions$.stream = m.hot('-a', { a: action });
        const expected = m.cold('-b', { b: completion });

        m.expect(effects.loginSuccess$).toBeObservable(expected);
      })
    );
  });

  describe('loadUser', () => {
    test(
      'should return LoadUserSuccess Observable',
      marbles(m => {
        const documentSnapshot: { exists: boolean; data?: () => any } = {
          exists: true
        };
        documentSnapshot.data = function() {
          return user;
        };

        jest
          .spyOn(userService, 'getUser')
          .mockReturnValue(Observable.of(documentSnapshot));

        const action = new fromAuthActions.LoadUserInfo('1234');
        const completion = new fromAuthActions.LoadUserInfoSuccess({
          uid: '1234',
          displayName: 'Roboto'
        });

        actions$.stream = m.hot('-a', { a: action });
        const expected = m.cold('-b', { b: completion });

        m.expect(effects.loadUserInfo$).toBeObservable(expected);
      })
    );
  });
});
