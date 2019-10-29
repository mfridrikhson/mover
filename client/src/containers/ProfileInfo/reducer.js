import { fetchUser } from '../../routines';
import { REGISTRATION_REQUEST, LOGIN_REQUEST } from './actionTypes';

const initialState = {
  user: null,
  isAuthorized: false,
  loading: true,
  error: null
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_REQUEST:
    case LOGIN_REQUEST:
    case fetchUser.TRIGGER:
      return {
        ...state,
        loading: true
      };
    case fetchUser.SUCCESS:
      return {
        ...state,
        isAuthorized: !!(action.payload && action.payload.id),
        user: action.payload
      };
    case fetchUser.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case fetchUser.FULFILL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};