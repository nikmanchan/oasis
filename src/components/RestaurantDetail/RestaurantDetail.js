import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Button, Card, CardImg, CardText, CardBody, CardLink,
//     CardTitle, CardSubtitle } from 'reactstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { withRouter } from 'react-router-dom';
import './RestaurantDetail.css';

const styles = theme => ({
    h2: {
        textAlign: 'center',
    },
    button: {
        width: '100%',
        margin: 'auto',
        color: 'green',
    },
    cardDiv: {
        marginTop: '5%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    card: {
        width: '22vmax',
        height: '31vmax',
        margin: 10,
        textAlign: 'center',
    },
    media: {
        height: '20vmax',
    },
});

class RestaurantDetail extends Component {


  handleAddRatingClick = (restaurant_id) => {

    this.setState({
        restaurant_id: restaurant_id,
    })

    console.log('add rating has been clicked!', restaurant_id);
    this.props.dispatch({type: 'SET_RATING_ID', payload: {
        restaurant_id
        }
    })

    this.props.dispatch({
        type: 'GET_RESTAURANT_DETAIL',
    }); 

    this.props.history.push('/rating')
    
  }

  render() {
    const { classes } = this.props;
    return (
        <div>
            <div className="details">
            <h2>Restaurant Details</h2>
                {/* {this.props.state.restaurantDetails.map((restaurant, index ) =>  */}
                {/* Show loading card if restaurantDetailsreducer is not fired */}
                {!this.props.state.restaurantDetails[0] ? <p>loading...</p> :
                
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={this.props.state.restaurantDetails[0].image_url}
                    />
                        
                    <CardContent>
                        <Typography>
                            <h2>{this.props.state.restaurantDetails[0].name}</h2>
                        </Typography>
                        
                        <Typography>
                            <p id="restaurantAddress">{this.props.state.restaurantDetails[0].address}</p>
                        &emsp;
                            <a href={this.props.state.restaurantDetails[0].menu_url} target="_blank"><span class="restaurantLink">Menu</span></a>
                            &emsp;&emsp;
                            <a href={`https://www.google.com/maps/dir/?api=1&destination=${this.props.state.restaurantDetails[0].address}`} target="_blank"><span class="restaurantLink">Get Directions</span></a>

                        </Typography>

                    </CardContent>
                </Card>
                }
                
                
            </div>

            <div className="ratings">
                <h2 className="ratingsHeader">
                    Ratings 
                    &emsp;&emsp;
                    <Button color="primary" variant="contained" onClick={() => this.handleAddRatingClick(this.props.state.restaurantDetails[0].restaurant_id)}>Add Rating</Button>
                </h2>

                <div className="ratingsList">
                    {this.props.state.restaurantDetails.map(restaurant => 
                    <ul key={restaurant.restaurant_id}>
                        {console.log(restaurant)}
                        
                        <li>friendliness rating: {restaurant.friendliness}</li>
                        <li>costliness rating: {restaurant.costliness}</li>
                        <li>comments: 
                        <br></br>
                        {restaurant.comments}</li>
                    </ul>
                    )}
                </div>

            </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    state: state,
  });

  RestaurantDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(RestaurantDetail));
