import { combineReducers } from 'redux';

import { profile } from '../containers/Settings/reducer';
import { order } from '../containers/Order/reducer';

export default combineReducers({
  profile,
  order
});
