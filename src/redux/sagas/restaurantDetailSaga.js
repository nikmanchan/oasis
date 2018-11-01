import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
// worker Saga: will be fired on "GET_RESTAURANT_DETAIL" actions
function* getRestaurantDetail(action) {
    try {
      const details = yield axios.get(`/api/restaurant/${action.payload}`)
      yield put({ type: 'SET_RESTAURANT_DETAILS', payload: details.data });
      
    } catch (error) {
      console.log('error getting address:', error);
    }
}

function* restaurantSaga() {
    yield takeLatest('GET_RESTAURANT_DETAIL', getRestaurantDetail);
}

export default restaurantSaga;
