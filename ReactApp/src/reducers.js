import { combineReducers } from 'redux';

import cars from './reducers/carReducer';
import navigation from './reducers/navigationReducer';
import form from './reducers/formReducer';
import series from './reducers/seriesReducer';
import graphConfig from './reducers/graphConfigReducer';

export default combineReducers({
  cars,
  navigation,
  form,
  series,
  graphConfig,
});
