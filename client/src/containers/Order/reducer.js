import { submitOrder } from '../../routines';

const initialState = {
  order: null,
  loading: false,
  error: null
};

export const order = (state = initialState, action) => {
  switch (action.type) {
    case submitOrder.TRIGGER:
      return {
        ...state,
        loading: true
      };
    case submitOrder.SUCCESS:
      return {
        ...state,
        order: action.payload
      };
    case submitOrder.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case submitOrder.FULFILL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
