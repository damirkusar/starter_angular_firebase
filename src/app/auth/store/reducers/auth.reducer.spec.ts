import * as fromAuth from './auth.reducer';
import * as fromAuthActions from '../actions/auth.action';

describe('AuthReducer', () => {
  describe('undefined action', () => {
    test('should return the default state', () => {
      const { initialState } = fromAuth;
      const action = {} as any;
      const state = fromAuth.reducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LoginSuccess action', () => {
    beforeEach(() => {});

    test('should not set loggedIn to true', () => {
      const { initialState } = fromAuth;
      const action = new fromAuthActions.LoginSuccess('123');
      const state = fromAuth.reducer(initialState, action);

      expect(state.loggedIn).toBe(false);
    });
  });

  describe('LoadUserInfoSuccess action', () => {
    beforeEach(() => {});

    test('should set user', () => {
      const { initialState } = fromAuth;
      const payload = { uid: '1234', displayName: 'Roboto' };
      const action = new fromAuthActions.LoadUserInfoSuccess(payload);
      const state = fromAuth.reducer(initialState, action);

      expect(state.loggedIn).toBe(true);
      expect(state.user).toBe(payload);
    });
  });
});
