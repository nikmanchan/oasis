import React, { Component } from 'react';
import { connect } from 'react-redux';
// import google maps api for Marker and InfoWindow
import { Marker, InfoWindow } from 'react-google-maps';

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
    return (
        
        <Marker
        position={this.props.position}
        onClick={this.handleToggleOpen}> 
            
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

