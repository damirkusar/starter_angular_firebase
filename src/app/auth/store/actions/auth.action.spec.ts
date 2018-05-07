import * as fromAuth from './auth.action';
import { User } from '../../../user/models';

describe('Auth Actions', () => {
  describe('Login Action', () => {
    describe('Login', () => {
      test('should create an action', () => {
        const payload = { email: 'test', password: 'password' };
        const action = new fromAuth.Login(payload);

        expect({ ...action }).toEqual({
          type: fromAuth.AuthActionTypes.Login,
          payload
        });
      });
    });

    describe('LoginSuccess', () => {
      test('should create an action', () => {
        const payloadUid = '123';
        const action = new fromAuth.LoginSuccess(payloadUid);

        expect({ ...action }).toEqual({
          type: fromAuth.AuthActionTypes.LoginSuccess,
          payload: payloadUid
        });
      });
    });

    describe('LoginFailure', () => {
      test('should create an action', () => {
        const payload = { error: 'someError' };
        const action = new fromAuth.LoginFailure(payload);

        expect({ ...action }).toEqual({
          type: fromAuth.AuthActionTypes.LoginFailure,
          payload
        });
      });
    });
  });

  describe('Logout Actions', () => {
    describe('Logout', () => {
      test('should create an action', () => {
        const action = new fromAuth.Logout();

        expect({ ...action }).toEqual({
          type: fromAuth.AuthActionTypes.Logout
        });
      });
    });
  });

  describe('Load User Info Actions', () => {
    describe('LoadUser', () => {
      test('should create an action', () => {
        const payloadUid = '123';
        const action = new fromAuth.LoadUserInfo(payloadUid);

        expect({ ...action }).toEqual({
          type: fromAuth.AuthActionTypes.LoadUserInfo,
          payload: payloadUid
        });
      });
    });

    describe('LoadUserSuccess', () => {
      test('should create an action', () => {
        const payload = { uid: '1234', displayName: 'Roboto' };
        const action = new fromAuth.LoadUserInfoSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromAuth.AuthActionTypes.LoadUserInfoSuccess,
          payload
        });
      });
    });

    describe('LoadUserFailure', () => {
      test('should create an action', () => {
        const payload = { error: 'someError' };
        const action = new fromAuth.LoadUserInfoFailure(payload);

        expect({ ...action }).toEqual({
          type: fromAuth.AuthActionTypes.LoadUserInfoFailure,
          payload
        });
      });
    });
  });
});
