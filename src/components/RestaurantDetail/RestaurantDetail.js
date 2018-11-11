import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle } from 'reactstrap';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import './RestaurantDetail.css';

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
    const styles = {
        card: {
            width:35+'vw'
        },
        media: {
            height: 300,
            width: 100 + '%'
        },
    };
    return (
        <div>
            <div className="details">
            <h2>Restaurant Details</h2>
                {/* {this.props.state.restaurantDetails.map((restaurant, index ) =>  */}
                {/* Show loading card if restaurantDetailsreducer is not fired */}
                {!this.props.state.restaurantDetails[0] ? <p>loading...</p> :
                <Card style={styles.card}>
                    <img height="300px" src={this.props.state.restaurantDetails[0].image_url} />
                        
                    <CardBody>
                        <h3>{this.props.state.restaurantDetails[0].name}</h3>
                        <p>{this.props.state.restaurantDetails[0].address}</p>
                        <p>
                        <a href={this.props.state.restaurantDetails[0].menu_url} target="_blank">Menu</a>
                        &ensp;
                        <a href={`https://www.google.com/maps/dir/?api=1&destination=${this.props.state.restaurantDetails[0].address}`} target="_blank">Get Directions</a>
                        </p>
                    </CardBody>
                </Card>
                }
                
                
            </div>
            <div class="ratings">
                <h2>Ratings</h2>
                <div className="ratingsList">
                    {this.props.state.restaurantDetails.map(restaurant => 
                    <ul key={restaurant.restaurant_id}>
                        <li>friendliness rating: {restaurant.friendliness}</li>
                        <li>costliness rating: {restaurant.costliness}</li>
                        <li>comments: 
                        <br></br>
                        {restaurant.comments}</li>
                    </ul>
                    )}
                </div>
                <Button color="secondary" onClick={() => this.handleAddRatingClick(this.props.state.restaurantDetails[0].restaurant_id)}>Add Rating</Button>
            </div>


      </div>
    );
  }
}

const mapStateToProps = state => ({
    state: state,
  });

export default withRouter(connect(mapStateToProps)(RestaurantDetail));
