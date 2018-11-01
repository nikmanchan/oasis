const restaurantRating = (state = [], action) => {
    switch (action.type) {
      case 'ADD_RATINGS':
        return [...state, action.payload];
      case 'SET_RATING_ID':
        return [...state, action.payload];
      default:
        return state;
    }
  };

// restaurant rating will be on the redux state at:
// state.restaurantRating
  export default restaurantRating;