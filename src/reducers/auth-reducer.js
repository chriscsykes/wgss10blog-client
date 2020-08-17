import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
  username: '',
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { authenticated: true, username: action.username };
    case ActionTypes.DEAUTH_USER:
      return { authenticated: false, username: '' };
    case ActionTypes.AUTH_ERROR:
      return { authenticated: false, username: '' };
    default:
      return state;
  }
};

export default AuthReducer;
