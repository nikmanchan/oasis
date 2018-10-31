import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    withRouter 
  } from 'react-router-dom';
// import google maps api for Marker and InfoWindow
import { Marker, InfoWindow } from 'react-google-maps';
import DetailButton from '../DetailButton/DetailButton'
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

    handleMoreDetailsClick = (id) => {
            this.props.dispatch({
                type: 'GET_RESTAURANT_DETAIL',
                payload: id
            }); 
            
            this.props.history.push('/detail');
            
    }

  render() {

    return (  
        // Setup Marker
        <Marker
        position={this.props.position}
        onClick={this.handleToggleOpen}
        icon={{ url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsJVx26hMBdT3OmFnvvJIasf05xtwwE-pwnWrBFbm4JXsvWlo2_g", 
        size: {width: 60, height: 100}, anchor: {x: 15, y: 50}, scaledSize: {width: 30, height: 30}, }}>

        {/* Set up InfoWindow */}
            {this.state.isOpen && <InfoWindow onCloseClick={this.handleToggleOpen}>
            
            <div>
                {this.props.name}
                {/* <DetailButton id={this.props.id}/> */}
                <button onClick={() => this.handleMoreDetailsClick(this.props.id)}>More Details</button>
            </div>    
        </InfoWindow> }
        {/* End InfoWindow */}
         
        </Marker>
        // End Marker


    );
  }
}

const mapStateToProps = state => ({
    state: state,
  });

export default withRouter(connect(mapStateToProps)(RestaurantMarker));

