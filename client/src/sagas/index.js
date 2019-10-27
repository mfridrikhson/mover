import { all } from 'redux-saga/effects';

import userSagas from '../containers/ProfileInfo/sagas';

export default function* rootSaga() {
  yield all([
    userSagas()
  ]);
}
