import React, { Component } from 'react';
import Map from '../Map/Map'
import { connect } from 'react-redux';

class MainMap extends Component {
  state = {
    isMarkerShown: false,
    isOpen: false,
  }

  componentDidMount() {
    this.props.dispatch({type: 'GET_RESTAURANTS' });
  }

  handleToggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <div>
        <Map 
            googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZv9A4Vtnra6r04z9JnNk91zeXwX82O68&v=3.exp&libraries=geometry,drawing,places"
            loadingElement = {<div style={{ height: `100%` }} />}
            containerElement = {<div style={{ height: `650px`, width: '70%'}} />}
            mapElement = {<div style={{ height: `100%` }} />}
            isMarkerShown={this.state.isMarkerShown}
            onMarkerClick={this.handleMarkerClick}
            handleToggleOpen={this.handleToggleOpen}
            isOpen = {this.state.isOpen}
        />

      </div>
    );
  }
}

const mapStateToProps = state => ({
    state: state,
  });

export default connect(mapStateToProps)(MainMap);