import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './AddRating.css'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddRating extends Component {

  state = {
    friendliness: 0,
    costliness: 0,
    comments: '',
    restaurant_id: 1,
    dropdownOpen: false,

  }

  toggle() {
    this.setState({
      dropdownOpen: !this.dropdownOpen
    });
  }

  componentDidMount() {
    this.setState({
      restaurant_id: this.props.state.restaurantDetails[0].restaurant_id,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      restaurant_id: this.props.state.restaurantDetails[0].restaurant_id,
    })

    // Send ratings to redux state
    this.props.dispatch({
      type: 'ADD_RATING',
      payload: this.state
    })

    // Get restaurant detail with new ratings
    this.props.dispatch({
      type: 'GET_RESTAURANT_DETAIL', payload: this.state.restaurant_id
    });

    // Clear input form
    this.setState({
      friendliness: 0,
      costliness: 0,
      comments: '',
    })
    this.props.history.push('/map');

  } // End handleSubmit

  handleChange = (property) => (event) => {
    this.setState({
      ...this.state,
      [property]: event.target.value
    })
  }

  render() {

    return (
      <div className="addRating">

        <Form onSubmit={this.handleSubmit} className="ratingsForm">
          <h2>Add Ratings</h2>
          <FormGroup>
            <Label for="friendlinessRating">Friendliness Rating</Label>
            <Input type="select" name="select"
              onChange={this.handleChange('friendliness')}
              value={this.state.friendliness} id="friendlinessRating">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="costlinessRating">Costliness Rating</Label>
            <Input type="select" name="select"
              onChange={this.handleChange('costliness')}
              value={this.state.costliness} id="costlinessRating">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="comments">Comments</Label>
            <Input type="textarea" name="text" value={this.state.comments}
              onChange={this.handleChange('comments')} id="comments"
            />
          </FormGroup>

          <Button onClick={this.handleSubmit}>Submit</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state,
});

export default withRouter(connect(mapStateToProps)(AddRating));