import { combineReducers } from 'redux';

import { user } from '../containers/ProfileInfo/reducer';
import { order } from '../containers/Order/reducer';

export default combineReducers({
  user,
  order
});
