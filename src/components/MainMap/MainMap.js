import React, { Component } from 'react';
import SearchBoxMap from '../Map/SearchMap'
import { connect } from 'react-redux';

class MainMap extends Component {
  state = {
    isMarkerShown: false,
  }


  render() {
    return (
      <div>
        <SearchBoxMap 
            googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZv9A4Vtnra6r04z9JnNk91zeXwX82O68&v=3.exp&libraries=geometry,drawing,places"
            loadingElement = {<div style={{ height: `100%` }} />}
            containerElement = {<div style={{ height: `700px`, width: '75%'}} />}
            mapElement = {<div style={{ height: `100%` }} />}
            isMarkerShown={this.state.isMarkerShown}
            onMarkerClick={this.handleMarkerClick}
        />
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(MainMap);