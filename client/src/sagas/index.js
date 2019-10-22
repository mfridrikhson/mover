import { all } from 'redux-saga/effects';

import userSagas from '../containers/Routing/sagas';

export default function* rootSaga() {
  yield all([
    userSagas()
  ]);
}
