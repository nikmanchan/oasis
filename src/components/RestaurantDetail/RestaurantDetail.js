import React, { Component } from 'react';
import { connect } from 'react-redux';

class RestaurantDetail extends Component {


  render() {
    return (
      <div>
        <h2>Restaurant Detail</h2>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(RestaurantDetail);