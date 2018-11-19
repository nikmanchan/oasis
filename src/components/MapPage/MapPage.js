import React, { Component } from 'react';
import Map from '../Map/Map'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './MapPage.css';

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

const styles = theme => ({
  button: {
      width: '100%',
      margin: 'auto',
  },
  cardDiv: {
      marginTop: '5%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
  },
  card: {
      width: '15vmax',
      height: '23vmax',
      // margin: 10,
      // paddingTop: '1vmax',
  },
  media: {
      height: '20vmin',
  },
});

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
    this.props.dispatch({type: 'GET_RESTAURANTS_MINNEAPOLIS' });
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
        payload: Number(restaurant_id)
    }); 
    
    this.props.history.push('/detail');
    
}

  setCurrentCity = (city) => {
    this.setState({
      ...this.state,
      city: city.name,
      center: {
        lat: city.center.lat,
        lng: city.center.lng,
      }
    })

    
    this.props.dispatch({type: 'GET_RESTAURANTS_BY_CITY', payload: city.name});

    
    console.log(this.state);
    
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <Map 
            googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZv9A4Vtnra6r04z9JnNk91zeXwX82O68&v=3.exp&libraries=geometry,drawing,places"
            loadingElement = {<div style={{ height: `100%` }} />}
            containerElement = {<div style={{ height: `80vmin`, width: '55vmax', float: 'left',}} />}
            mapElement = {<div style={{ height: `100%` }} />}
            isMarkerShown={this.state.isMarkerShown}
            onMarkerClick={this.handleMarkerClick}
            handleToggleOpen={this.handleToggleOpen}
            isOpen = {this.state.isOpen}
            center = {this.state.center}
            />
              <div className="restaurantList">
              
              <div className="citySelect">
                <h4>
                  Select Supported City &emsp;
                </h4>
                
                  <Button size="large"
                      variant="contained"
                      color="primary" 
                      onClick={() => this.setCurrentCity(stPaul)}>
                      St Paul
                  </Button>
                  <Button size="large"
                          variant="contained"
                          color="primary"onClick={() => this.setCurrentCity(minneapolis)}>
                          Minneapolis
                  </Button>
              </div>
              <br></br>
                    {this.props.state.restaurants.map(restaurant => 
                    <Card key={restaurant.restaurant_id} className={classes.card}>
                              <CardMedia
                                    className={classes.media}
                                    image={restaurant.image_url}
                                    title="Generic Project"
                                />
                                <CardContent>
                                    <Typography variant="h6">
                                        {restaurant.name}
                                    </Typography>
                                    <br />
                                    <Typography>
                                        {restaurant.address}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <div className={classes.button}>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="primary"
                                            // onClick={() => this.props.selectSite(this.props.site)}
                                            onClick={() => this.handleMoreDetailsClick(restaurant.restaurant_id)}
                                        >
                                            More Details
                                        </Button>
                                    </div>
                                </CardActions>
                    </Card>
                    )}
                </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
    state: state,
  });

MainMap.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(MainMap));