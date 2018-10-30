const restaurants = (state = [], action) => {
    switch (action.type) {
    //   case 'ADD_RESTAURANT':
    //     return [...state, action.payload];
      case 'SET_RESTAURANTS':
        return action.payload;
      default:
        return state;
    }
  };

// restaurants will be on the redux state at:
// state.restaurants
  export default restaurants;