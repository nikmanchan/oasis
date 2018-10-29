import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { put, takeLatest, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';


import rootReducer from './redux/reducers'; // imports ./redux/reducers/index.js
import rootSaga from './redux/sagas'; // imports ./redux/sagas/index.js

import App from './components/App/App';
// function* rootSaga() {
//   yield takeEvery('GET_RESTAURANTS', getRestaurants);
// }

// function* getRestaurants(action) {
// try {
//   const address = yield call(
//     axios.get('/api/restaurant')
//     .then(response => response.data)
//     .catch((error) => { throw error.response || error; })

// );
//   yield put({ type: 'SET_ADDRESS', payload: address.data });
// } catch (error) {
//   console.log('error getting address:', error);
// }
// }

const sagaMiddleware = createSagaMiddleware();

const mapRequest = (state = [], action) => {
  switch (action.type) {
    case 'SET_ADDRESS':
      return action.payload;
    default:
      return state;
  }
};



// this line creates an array of all of redux middleware you want to use
// we don't want a whole ton of console logs in our production code
// logger will only be added to your project if your in development mode
const middlewareList = process.env.NODE_ENV === 'development' ?
  [sagaMiddleware, logger] :
  [sagaMiddleware];

const store = createStore(
  // tells the saga middleware to use the rootReducer
  // rootSaga contains all of our other reducers
  rootReducer,
  // adds all middleware to our project including saga and logger
  applyMiddleware(...middlewareList),
);

// tells the saga middleware to use the rootSaga
// rootSaga contains all of our other sagas
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root'),
);

