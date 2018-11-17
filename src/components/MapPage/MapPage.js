import React, { Component } from 'react';
import Map from '../Map/Map'
import { connect } from 'react-redux';

const minneapolis = {
  name: 'Minneapolis',
  center: {
    lat: 44.9778,
    lng: -93.2650,
  },
}

const stPaul = {
  name: 'St Paul',
  center: {
    lat: 44.9537,
    lng: -93.0900,
  }
}

class MainMap extends Component {
  state = {
    isMarkerShown: false,
    isOpen: false,
    city: '',
    center: {
      lat: 44.9778,
      lng: -93.2650,
    }
  }

  componentDidMount() {
    this.props.dispatch({type: 'GET_RESTAURANTS' });
  }

  handleToggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  setCurrentCity = (city) => {
    this.setState({
      ...this.state,
      city: city.name,
      center: {
        lat: city.center.lat,
        lng: city.center.lng,
      }
    })

    this.props.dispatch({type: 'GET_RESTAURANTS_BY_CITY', payload: this.state.city.name });
    
    console.log(this.state);
    
  }

  render() {

    return (
      <div>
        <Map 
            googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZv9A4Vtnra6r04z9JnNk91zeXwX82O68&v=3.exp&libraries=geometry,drawing,places"
            loadingElement = {<div style={{ height: `100%` }} />}
            containerElement = {<div style={{ height: `100vmin`, width: '70vmax', float: 'left',}} />}
            mapElement = {<div style={{ height: `100%` }} />}
            isMarkerShown={this.state.isMarkerShown}
            onMarkerClick={this.handleMarkerClick}
            handleToggleOpen={this.handleToggleOpen}
            isOpen = {this.state.isOpen}
            center = {this.state.center}
            />
              <div className="citySelect">
                  <button onClick={() => this.setCurrentCity(stPaul)}>St Paul</button>
                  <button onClick={() => this.setCurrentCity(minneapolis)}>Minneapolis</button>
              </div>
              <div>

              </div>
        

      </div>
    );
  }
}

const mapStateToProps = state => ({
    state: state,
  });

export default connect(mapStateToProps)(MainMap);