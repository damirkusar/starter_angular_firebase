import { AuthActions, AuthActionTypes } from '../actions';
import { User } from '../../../user/models';

export interface State {
  loggedIn: boolean;
  user: User | null;
}

export const initialState: State = {
  loggedIn: false,
  user: null
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoadUserInfoSuccess: {
      return {
        ...state,
        loggedIn: true,
        user: action.payload
      };
    }

    case AuthActionTypes.LoginFailure:
    case AuthActionTypes.RegisterFailure:
    case AuthActionTypes.StoreUserInfoFailure:
    case AuthActionTypes.LoadUserInfoFailure:
    case AuthActionTypes.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
