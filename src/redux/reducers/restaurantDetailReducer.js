const restaurantDetail = (state = {}, action) => {
    switch (action.type) {
      case 'SET_RESTAURANT_DETAIL':
        return action.payload;
      default:
        return state;
    }
  };

// restaurant details will be on the redux state at:
// state.restaurantDetail
  export default restaurantDetail;