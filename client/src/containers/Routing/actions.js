import { REGISTRATION_REQUEST, LOGIN_REQUEST } from './actionTypes';

export const registrationRequest = user => ({
  type: REGISTRATION_REQUEST,
  payload: user
});

export const loginRequest = credentials => ({
  type: LOGIN_REQUEST,
  payload: credentials
});
