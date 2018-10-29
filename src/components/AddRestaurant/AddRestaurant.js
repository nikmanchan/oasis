import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddRestaurant extends Component {
  state={
    name: '',
    address: '',
    restriction: '',
    friendlinessRating: 0,
    costlinessRating: 0,
    comments: '',
    image_url: '',
  }

  handleSubmit = (event) => {
    // event.preventdefault();
    this.props.dispatch({
      type: 'ADD_RESTAURANT',
      payload: this.state
    })
    this.setState({
      name: '',
      address: '',
      restriction: '',
      friendlinessRating: 0,
      costlinessRating: 0,
      comments: '',
      image_url: '',
    })
  }

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

          <p>restriction:
          <select value={this.state.restriction} onChange={this.handleChange('restriction')}>
            <option value="vegetarian">vegetarian</option>
            <option value="vegan">vegan</option>
          </select>
          </p>

          <p>friendliness rating:
            <select onChange={this.handleChange('friendlinessRating')} value={this.state.friendlinessRating}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

          </p>
          <p>
          costliness rating:
          <select value={this.state.costlinessRating} onChange={this.handleChange('costlinessRating')}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          </p>

          <input placeholder="comments" value={this.state.comments} onChange={this.handleChange('comments')}></input>
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