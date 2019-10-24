import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as authService from '../../services/authService';
import { fetchUser } from '../../routines';
import { LOGIN_REQUEST, REGISTRATION_REQUEST } from './actionTypes';

function* userRequest() {
  try {
    const user = yield call(authService.getCurrentUser);

    yield put(fetchUser.success(user));
  } catch (error) {
    yield put(fetchUser.failure(error.message));
  } finally {
    yield put(fetchUser.fulfill());
  }
}

function* registrationRequest({ payload }) {
  try {
    const { user, token } = yield call(authService.register, payload);

    localStorage.setItem('token', token);
    yield put(fetchUser.success(user));
  } catch (error) {
    yield put(fetchUser.failure(error.message));
  } finally {
    yield put(fetchUser.fulfill());
  }
}

function* loginRequest({ payload }) {
  try {
    const { user, token } = yield call(authService.login, payload);

    localStorage.setItem('token', token);
    yield put(fetchUser.success(user));
  } catch (error) {
    yield put(fetchUser.failure(error.message));
  } finally {
    yield put(fetchUser.fulfill());
  }
}

function* watchUserRequest() {
  yield takeEvery(fetchUser.TRIGGER, userRequest);
}

function* watchRegistrationRequest() {
  yield takeEvery(REGISTRATION_REQUEST, registrationRequest);
}

function* watchLoginRequest() {
  yield takeEvery(LOGIN_REQUEST, loginRequest);
}

export default function* userSagas() {
  yield all([
    watchUserRequest(),
    watchRegistrationRequest(),
    watchLoginRequest()
  ]);
}
