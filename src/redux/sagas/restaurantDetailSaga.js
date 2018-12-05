import axios from 'axios';
import { put, takeLatest, } from 'redux-saga/effects';
// worker Saga: will be fired on "GET_RESTAURANT_DETAIL" actions
function* getRestaurantDetail(action) {
    try {
      const details = yield axios.get(`/api/restaurant/specific/${action.payload}`)
      yield put({ type: 'SET_RESTAURANT_DETAILS', payload: details.rows });
      console.log('RESTAURANT DETAILS BACK WITH:', details.rows);
      
    } catch (error) {
      console.log('error getting address:', error);
    }
}

function* restaurantSaga() {
    yield takeLatest('GET_RESTAURANT_DETAIL', getRestaurantDetail);
}

export default restaurantSaga;
