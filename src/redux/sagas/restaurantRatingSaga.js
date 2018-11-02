import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
// worker Saga: will be fired on "FETCH_USER" actions


function* addRating(action) {
      try {
        yield call(axios.post, '/api/restaurant/rating', action.payload);
        yield put({ type: 'SET_RESTAURANT_DETAILS' });
    } catch (error) {
        console.log('error posting a rating:', error);
    }
}

function* restaurantSaga() {
    yield takeLatest('ADD_RATING', addRating);
}

export default restaurantSaga;
