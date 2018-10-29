import React, { Component } from 'react';
import MainMap from '../MainMap/MainMap'
import { connect } from 'react-redux';

class MapPage extends Component {
  state = {
    input: '',
    radius: 0,
    isMarkerShown: false,
  }

  componentDidMount() {
    this.props.dispatch({type: 'GET_RESTAURANTS' });

  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'GET_ADDRESS', payload: this.state
    })
  }

  handleChange = (property) => (event) => {
    this.setState({
      ...this.state,
      [property]: event.target.value,
    });
  }



  render() {
    return (
      <div>
        <MainMap />
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(MapPage);

