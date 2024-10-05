// src/store.js

import { createStore } from 'redux';
import rootReducer from './reducers'; // Assuming you have a rootReducer in 'src/reducers/index.js'

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Enable Redux DevTools Extension
);

export { store };
