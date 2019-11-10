import { all } from 'redux-saga/effects';

import userSagas from '../containers/Settings/sagas';
import orderSagas from '../containers/Order/sagas';

export default function* rootSaga() {
  yield all([
    userSagas(),
    orderSagas()
  ]);
}
