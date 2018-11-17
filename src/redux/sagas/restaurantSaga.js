import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
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

function* getRestaurantsByCity(action) {
    try {
      const restaurants = yield axios.get(`/api/restaurant/city`, action.payload)
      yield put({ type: 'SET_RESTAURANTS', payload: restaurants.data });
      
    } catch (error) {
      console.log('error getting restaurant by city:', error);
    }
}

function* addRestaurant(action) {
      try {
        yield call(axios.post, '/api/restaurant', action.payload);
        yield put({ type: 'SET_RESTAURANTS' });
    } catch (error) {
        console.log('error posting a restaurant:', error);
    }
}

function* restaurantSaga() {
    yield takeLatest('GET_RESTAURANTS', getRestaurants);
    yield takeLatest('GET_RESTAURANTS_BY_CITY', getRestaurantsByCity);
    yield takeLatest('ADD_RESTAURANT', addRestaurant);
}

export default restaurantSaga;
