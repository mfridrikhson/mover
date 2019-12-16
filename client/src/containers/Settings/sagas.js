import { takeEvery, put, call, select, all } from 'redux-saga/effects';
import * as authService from '../../services/authService';
import * as userService from '../../services/userService';
import * as driverService from '../../services/driverService';
import * as vehicleService from '../../services/vehicleService';
import { fetchUser, addVehicle, updateDriver } from '../../routines';
import { LOGIN_REQUEST, REGISTRATION_REQUEST, UPDATE_USER_REQUEST } from './actionTypes';

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
    const { token, ...userData } = yield call(authService.register, payload);

    localStorage.setItem('token', token);
    yield put(fetchUser.success(userData));
  } catch (error) {
    yield put(fetchUser.failure(error.message));
  } finally {
    yield put(fetchUser.fulfill());
  }
}

function* loginRequest({ payload }) {
  try {
    const { token, ...userData } = yield call(authService.login, payload);

    localStorage.setItem('token', token);
    yield put(fetchUser.success(userData));
  } catch (error) {
    yield put(fetchUser.failure(error.message));
  } finally {
    yield put(fetchUser.fulfill());
  }
}

function* updateUserRequest({ payload }) {
  try {
    const user = yield call(userService.updateUser, payload);

    yield put(fetchUser.success({ user }));
  } catch (error) {
    yield put(fetchUser.failure(error.message));
  } finally {
    yield put(fetchUser.fulfill());
  }
}

function* updateDriverRequest({ payload }) {
  try {
    let user = yield call(driverService.updateDriver, payload);
    if (payload.currentVehicleId) {
      const allVehicles = yield select(({ profile: { driver: { vehicles } } }) => vehicles);
      user = { ...user, currentVehicle: allVehicles.find(({ id }) => id === payload.currentVehicleId) };
    }

    yield put(updateDriver.success(user));
  } catch (error) {
    yield put(updateDriver.failure(error.message));
  } finally {
    yield put(updateDriver.fulfill());
  }
}

function* addVehicleRequest({ payload }) {
  try {
    const vehicle = yield call(vehicleService.addVehicle, payload);

    yield put(addVehicle.success(vehicle));
  } catch (error) {
    yield put(addVehicle.failure(error.message));
  } finally {
    yield put(addVehicle.fulfill());
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

function* watchUpdateUserRequest() {
  yield takeEvery(UPDATE_USER_REQUEST, updateUserRequest);
}

function* watchUpdateDriverRequest() {
  yield takeEvery(updateDriver.TRIGGER, updateDriverRequest);
}

function* watchAddVehicleRequest() {
  yield takeEvery(addVehicle.TRIGGER, addVehicleRequest);
}

export default function* userSagas() {
  yield all([
    watchUserRequest(),
    watchRegistrationRequest(),
    watchLoginRequest(),
    watchUpdateUserRequest(),
    watchUpdateDriverRequest(),
    watchAddVehicleRequest()
  ]);
}
