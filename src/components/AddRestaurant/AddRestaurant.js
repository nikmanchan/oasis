import React, { Component } from 'react';
import { connect } from 'react-redux';
import Geocode from "react-geocode";


Geocode.setApiKey("AIzaSyCZv9A4Vtnra6r04z9JnNk91zeXwX82O68");

class AddRestaurant extends Component {

  state={
    name: '',
    address: '',
    image_url: '',
    menu_url: '',
    latitude: '',
    longitude: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    // convert Address to coordinates
    Geocode.fromAddress(this.state.address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;

        // Add new coordinates to state
        this.setState({
          ...this.state,
          latitude: lat,
          longitude: lng,
        })

        // Send Restaurant to redux state
        this.props.dispatch({
          type: 'ADD_RESTAURANT',
          payload: this.state
        })

        // Clear input form
        this.setState({
          name: '',
          address: '',
          image_url: '',
          menu_url: '',
          latitude: '',
          longitude: '',
        })
      },
      error => {
        console.error(error);
      }
    );
  } // End handleSubmit

  handleChange = (property) => (event) => {
    this.setState({
        ...this.state,
        [property]: event.target.value
    })
}

  render() {
    return (
      <div>
      <h2>
        Add Restaurant
      </h2>
      
      <form onSubmit={this.handleSubmit}>
          <input placeholder="name" value={this.state.name} onChange={this.handleChange('name')} ></input>
          <input placeholder="address" value={this.state.address} onChange={this.handleChange('address')}></input>
          <input placeholder="image_url" value={this.state.image_url} onChange={this.handleChange('image_url')}></input>
          <input placeholder="menu_url" value={this.state.menu_url} onChange={this.handleChange('menu_url')}></input>
          <br></br>
          <input type="submit"></input>
      </form>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state,
});

export default connect(mapStateToProps)(AddRestaurant);