import React, { Component } from 'react';
import { connect } from 'react-redux';

class RestaurantDetail extends Component {
    componentDidMount() {
        this.props.dispatch({type: 'GET_RESTAURANTS' });
    
      }

  render() {
    return (
      <div>
        <h2>Restaurant Detail</h2>
        {this.props.state.restaurants.map(restaurant => 
        <div key={restaurant.id}>
            <h3>{restaurant.name}</h3>
            <img src={restaurant.image_url} alt="restaurants"></img>
            <p>{restaurant.address}</p>

            <p>
                friendliness rating: {restaurant.friendliness}
                <br></br>
                costliness rating:{restaurant.costliness}
            </p>
            
            <p>{restaurant.comments}</p>

        </div>

        )}
        {/* {this.props.state.restaurants.map(restaurant => <Marker key={restaurant.id} position={{ lat: Number(restaurant.latitude), lng: Number(restaurant.longitude) }} onClick={this.props.handleToggleOpen}> 
                    {this.props.isOpen && <InfoWindow onCloseClick={this.props.handleToggleOpen}>
                      <p>
                        {restaurant.name}
                      </p>
                    </InfoWindow>} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
    state: state,
  });

export default connect(mapStateToProps)(RestaurantDetail);

