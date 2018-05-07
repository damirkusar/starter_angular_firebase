import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

import { TestBed } from '@angular/core/testing';

import * as fromRoot from '../../../_store';
import * as fromReducers from '../reducers/index';
import * as fromActions from '../actions/index';
import * as fromSelectors from './auth.selector';
import { User } from '../../../user/models';

describe('Auth Selectors', () => {
  let store: Store<fromReducers.AuthState>;

  const user: User = {
    uid: '1234',
    displayName: 'Roboto'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          authReducer: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
  });

  describe('getAuthStatusState', () => {
    test('should return state of auth with user and loggedIn', () => {
      let result;

      store
        .select(fromSelectors.getAuthStatusState)
        .subscribe(value => (result = value));

      expect(result).toEqual({
        loggedIn: false,
        user: null
      });

      store.dispatch(new fromActions.LoginSuccess('123'));

      expect(result).toEqual({
        loggedIn: false,
        user: null
      });
    });
  });

  describe('getLoggedIn', () => {
    test('should return loggedIn', () => {
      let result;

      store
        .select(fromSelectors.getLoggedIn)
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoginSuccess('123'));

      expect(result).toEqual(false);
    });
  });

  describe('getUser', () => {
    test('should return user', () => {
      let result;

      store.select(fromSelectors.getUser).subscribe(value => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new fromActions.LoadUserInfoSuccess(user));

      expect(result).toEqual(user);
    });
  });
});
