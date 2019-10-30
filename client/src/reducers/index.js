import { combineReducers } from 'redux';

import { user } from '../containers/Settings/reducer';
import { order } from '../containers/Order/reducer';

export default combineReducers({
  user,
  order
});
