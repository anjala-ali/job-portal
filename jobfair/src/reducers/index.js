import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Import your authReducer

const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers
});

export default rootReducer;