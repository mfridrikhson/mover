import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as orderService from '../../services/orderService';
import { submitOrder } from '../../routines';

function* submitOrderRequest({ payload }) {
  try {
    const order = yield call(orderService.submitOrder, payload);

    yield put(submitOrder.success(order));
  } catch (error) {
    yield put(submitOrder.failure(error.message));
  } finally {
    yield put(submitOrder.fulfill());
  }
}

function* watchSubmitOrderRequest() {
  yield takeEvery(submitOrder.TRIGGER, submitOrderRequest);
}

export default function* orderSagas() {
  yield all([
    watchSubmitOrderRequest()
  ]);
}
