import React, { Component } from 'react';
import { connect } from 'react-redux';
// import google maps api for Marker and InfoWindow
import { Marker, InfoWindow } from 'react-google-maps';
/* global google */


class RestaurantMarker extends Component {
    state = {
        isOpen: false,
    }
    
    handleToggleOpen = () => {
        this.setState({
          isOpen: !this.state.isOpen,
        });
    };

  render() {
//   let iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
//     var Marker = new google.maps.Marker({
//         icon: iconBase + "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsJVx26hMBdT3OmFnvvJIasf05xtwwE-pwnWrBFbm4JXsvWlo2_g"
//       });
    return (  
        
        <Marker
        position={this.props.position}
        onClick={this.handleToggleOpen}
        icon={{ url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsJVx26hMBdT3OmFnvvJIasf05xtwwE-pwnWrBFbm4JXsvWlo2_g", 
        size: {width: 60, height: 100}, anchor: {x: 15, y: 50}, scaledSize: {width: 30, height: 30}, }}>
            {this.state.isOpen && <InfoWindow onCloseClick={this.handleToggleOpen}>
            <p>
                {this.props.name}
            </p>    
        </InfoWindow> }
            
            
        </Marker>


    );
  }
}

const mapStateToProps = state => ({
    state: state,
  });

export default connect(mapStateToProps)(RestaurantMarker);

