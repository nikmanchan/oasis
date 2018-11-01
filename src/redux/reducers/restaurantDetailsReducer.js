const restaurantDetails = (state = [], action) => {
    switch (action.type) {
      case 'SET_RESTAURANT_DETAILS':
        return action.payload;
      default:
        return state;
    }
  };

// restaurant details will be on the redux state at:
// state.restaurantDetails
  export default restaurantDetails;