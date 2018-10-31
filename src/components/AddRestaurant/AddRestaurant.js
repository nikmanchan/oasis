import React, { Component } from 'react';
import { connect } from 'react-redux';
import Geocode from "react-geocode";


Geocode.setApiKey("AIzaSyCZv9A4Vtnra6r04z9JnNk91zeXwX82O68");

class AddRestaurant extends Component {

  state={
    name: '',
    address: '',
    restriction: '',
    friendliness: 0,
    costliness: 0,
    comments: '',
    image_url: '',
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
          restriction: '',
          friendliness: 0,
          costliness: 0,
          comments: '',
          image_url: '',
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
          <br></br>
          <input placeholder="address" value={this.state.address} onChange={this.handleChange('address')}></input>
      
          <p>restriction:
            <select value={this.state.restriction} onChange={this.handleChange('restriction')}>
              <option value="vegetarian">vegetarian</option>
              <option value="vegan">vegan</option>
            </select>
          </p>

          <p>friendliness rating:
            <select onChange={this.handleChange('friendliness')} value={this.state.friendliness}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>

          <p>costliness rating:
            <select value={this.state.costliness} onChange={this.handleChange('costliness')}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>

          <div>
            <textarea divlaceholder="comments" value={this.state.comments} onChange={this.handleChange('comments')}></textarea>
          </div>
          <input placeholder="image_url" value={this.state.image_url} onChange={this.handleChange('image_url')}></input>
          <input type="submit"></input>
      </form>
    </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(AddRestaurant);