import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

class AddRating extends Component {

  state={
    friendliness: 0,
    costliness: 0,
    comments: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    // let id = this.props.reduxState.restaurantDetails.restaurant_id;

    this.setState({
        restaurant_id: this.props.state.restaurantDetails.restaurant_id,
    })

    // Send ratings to redux state
    this.props.dispatch({
        type: 'ADD_RATINGS',
        payload: this.state
    })
    
    // Clear input form
    // this.setState({
    //     friendliness: 0,
    //     costliness: 0,
    //     comments: '',
    // })
    
    alert('Your rating has been added!');

    // this.props.history.push('/detail');

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
        Add Ratings
      </h2>
      
      <form onSubmit={this.handleSubmit}>

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
          <input type="submit"></input>
      </form>
    </div>
    );
  }
}

const mapStateToProps = state => ({
    state: state,
});

export default withRouter(connect(mapStateToProps)(AddRating));