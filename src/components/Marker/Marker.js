import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
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

    handleMoreDetailsClick = (id) => {
            let restaurant_id = id;
            console.log('this is the id:', id)
            this.props.dispatch({
                type: 'GET_RESTAURANT_DETAIL',
                payload: restaurant_id
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
                <br></br>
                {this.props.address}
                <br></br>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${this.props.address}`} target="_blank">Get Directions</a>
                <br></br>
                <Button onClick={() => this.handleMoreDetailsClick(this.props.id)}>More Details</Button>
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

