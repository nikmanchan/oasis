import React from 'react';
import './Map.css'
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import _ from 'lodash';
import RestaurantMarker from '../Marker/Marker'
/* global google */

class Map extends React.Component {
  state = {
    bounds: null,
    center: {
      lat: 44.9765, lng: -93.2761
    },
    isMarkerShown: false,
    showInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    windowPosition: null,
  }

  componentWillMount() {
    const refs = {}

    this.setState({
      bounds: null,
      center: {
        lat: 44.9778, lng: -93.2650
      },
      markers: [],
      onMapMounted: ref => {
        refs.map = ref;
      },
      onBoundsChanged: () => {
        this.setState({
          bounds: refs.map.getBounds(),
          center: refs.map.getCenter(),
        })
      },
      onSearchBoxMounted: ref => {
        refs.searchBox = ref;
      },
      onPlacesChanged: () => {
        const places = refs.searchBox.getPlaces();
        const bounds = new google.maps.LatLngBounds();

        places.forEach(place => {
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport)
          } else {
            bounds.extend(place.geometry.location)
          }
        });
        const nextMarkers = places.map(place => ({
          position: place.geometry.location,
        }));
        const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

        this.setState({
          center: nextCenter,
          markers: nextMarkers,
        });
        refs.map.fitBounds(bounds);
      },
    })
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  render() {
    return (
      <div>
        <GoogleMap
          ref={this.state.onMapMounted}
          defaultZoom={13.5}
          center={this.props.center}
          onBoundsChanged={this.props.onBoundsChanged}>
          <SearchBox
            ref={this.state.onSearchBoxMounted}
            bounds={this.state.bounds}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={this.state.onPlacesChanged}>
            <input
              type="text"
              placeholder="Enter Search Location"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `40vmax`,
                height: `2vmax`,
                marginTop: `27px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `1vw`,
                outline: `none`,
                textOverflow: `ellipses`,
                textAlign: 'center',
              }}
            />
          </SearchBox>

          {/*  Display Markers with InfoWindows */}
          {this.props.state.restaurants.map(restaurant => <RestaurantMarker key={restaurant.restaurant_id}
            position={{ lat: Number(restaurant.latitude), lng: Number(restaurant.longitude) }}
            name={restaurant.name} id={restaurant.restaurant_id} address={restaurant.address}
          />)}

          {/* End Markers Display */}

        </GoogleMap>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  state: state,
});

export default connect(mapStateToProps)(withScriptjs(withGoogleMap(Map)))
