import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
// worker Saga: will be fired on "FETCH_USER" actions
function* getRestaurants(action) {
    try {
      const address = yield axios.get('/api/restaurant')
    //   const response = yield axios.get('api/user', config);
      yield put({ type: 'SET_RESTAURANTS', payload: address.data });
      
    } catch (error) {
      console.log('error getting address:', error);
    }
    }

function* restaurantSaga() {
    yield takeLatest('GET_RESTAURANTS', getRestaurants);
}

export default restaurantSaga;
