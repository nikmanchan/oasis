import React from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import _ from 'lodash';
/* global google */
class SearchBoxMap extends React.Component {
state = {
    bounds: null,
    center: {
      lat: 44.9765, lng: -93.2761
    },
    isMarkerShown: false,
    isOpen: false,
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

handleMarkerClick = () => {
  this.setState({ isMarkerShown: false })
  this.delayedShowMarker()
}

handleToggleOpen = () => {

  this.setState({
    isOpen: !this.state.isOpen,
  })
}

  render() {
    return (
        <div>
            <GoogleMap
                ref={this.state.onMapMounted}
                defaultZoom={14}
                center={this.state.center}
                onBoundsChanged={this.props.onBoundsChanged}
            >
                <SearchBox
                ref={this.state.onSearchBoxMounted}
                bounds={this.state.bounds}
                controlPosition={google.maps.ControlPosition.TOP_LEFT}
                onPlacesChanged={this.state.onPlacesChanged}
                >
                    <input
                        type="text"
                        placeholder="Enter Search Location"
                        style={{
                          boxSizing: `border-box`,
                          border: `1px solid transparent`,
                          width: `240px`,
                          height: `32px`,
                          marginTop: `27px`,
                          padding: `0 12px`,
                          borderRadius: `3px`,
                          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                          fontSize: `14px`,
                          outline: `none`,
                          textOverflow: `ellipses`,
                        }}
                        />
                </SearchBox>
                {this.state.markers.map((marker, index) =>
                    <Marker key={index} position={marker.position} />
                  )}
                  <Marker position={{ lat: 44.9780, lng: -93.2635 }} onClick={this.handleToggleOpen}>
                {this.state.isOpen && <InfoWindow onCloseClick={this.handleToggleOpen}>
                      <p>
                        Yummy!
                      </p>
                    </InfoWindow>}
                  
                  </Marker>
                  
                  <Marker position={{ lat: 44.9836, lng: -93.2697 }} onClick={this.handleToggleOpen}>
                  {this.state.isOpen && <InfoWindow onCloseClick={this.handleToggleOpen}>
                    <p>
                      Moo!
                    </p>
                    </InfoWindow>}
                  </Marker>
              
                  {this.isMarkerShown && <Marker position={{ lat: 44.9738, lng: -93.2578 }} onClick={this.handleMarkerClick} />}
                  {this.isMarkerShown && <Marker position={{ lat: 44.9828, lng: -93.2695 }} onClick={this.handleMarkerClick} />}
        </GoogleMap>

        </div>
        );
    }
}
const mapStateToProps = state => ({
    state: state,
  });

export default connect(mapStateToProps)(withScriptjs(withGoogleMap(SearchBoxMap)))