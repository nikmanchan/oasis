import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import './AddRating.css'
import Select from 'react-select';
// import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class AddRating extends Component {

  state={
    friendliness: 0,
    costliness: 0,
    comments: '',
    restaurant_id: 1,
    dropdownOpen: false,
    
  }

//   this.onChange = this.onChange.bind(this)

  toggle(){
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
    
    // let id = this.props.reduxState.restaurantDetails.restaurant_id;

    this.setState({
        restaurant_id: this.props.state.restaurantDetails[0].restaurant_id,
    })

    console.log('this is the RESTAURANT ID:', this.props.state.restaurantDetails[0].restaurant_id);
    
    // Send ratings to redux state
    this.props.dispatch({
        type: 'ADD_RATING',
        payload: this.state
    })
    
    this.props.dispatch({
        type: 'GET_RESTAURANT_DETAIL', payload:this.state.restaurant_id
    }); 

    // Clear input form
    this.setState({
        friendliness: 0,
        costliness: 0,
        comments: '',
    })
    console.log(this.state);
    
    alert('Your rating has been added!', this.state);

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
      <h2>
        Add Ratings
      </h2>
      
      {/* <Form onSubmit={this.handleSubmit}>
      <FormGroup>
          <Label for="friendlinessRating">Friendliness Rating</Label>
          <Input type="select" name="select" 
        //   onChange={this.state.handleChange('friendliness')} 
          value={this.state.friendliness}id="friendlinessRating">
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
          onChange={this.state.handleChange('costliness')} 
          value={this.state.costliness}id="costlinessRating">
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
          onChange={this.state.handleChange('comments')} id="comments" 
          />
        </FormGroup> */}


          <div> 
            <select onChange={this.handleChange('friendliness')} value={this.state.friendliness}>
              <option value="friendliness">friendliness rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div>
            <select value={this.state.costliness} onChange={this.handleChange('costliness')}>
              <option value="costliness">costliness rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div>
            <textarea placeholder="comments" value={this.state.comments} onChange={this.handleChange('comments')}></textarea>
          </div> 
          {/* <input type="submit"></input> */}

            <Button onClick={this.handleSubmit}>Submit</Button>
      {/* </Form> */}
    </div>
    );
  }
}

const mapStateToProps = state => ({
    state: state,
});

export default withRouter(connect(mapStateToProps)(AddRating));