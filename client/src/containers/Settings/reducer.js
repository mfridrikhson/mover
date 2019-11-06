import { fetchUser, addVehicle } from '../../routines';
import { REGISTRATION_REQUEST, LOGIN_REQUEST } from './actionTypes';

const initialState = {
  user: null,
  driver: null,
  isAuthorized: false,
  loading: true,
  error: null
};

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_REQUEST:
    case LOGIN_REQUEST:
    case addVehicle.TRIGGER:
    case fetchUser.TRIGGER:
      return {
        ...state,
        loading: true
      };
    case fetchUser.SUCCESS:
      return {
        ...state,
        isAuthorized: !!(action.payload && action.payload.id),
        user: { ...action.payload, type: 'driver' }
      };
    case addVehicle.SUCCESS:
      return {
        ...state,
        driver: {
          ...state.driver,
          vehicles: [...state.vehicles, action.payload]
        }
      };
    case addVehicle.FAILURE:
    case fetchUser.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case addVehicle.FULFILL:
    case fetchUser.FULFILL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
