import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

class RestaurantDetail extends Component {
  
  state = {
      restaurant_id: 0,
  }

  componentDidMount() {
      this.setState({
        restaurant_id: this.props.state.restaurantDetails.restaurant_id,
      })
      console.log(this.state);
      
  }

  handleAddRatingClick = (restaurant_id) => {

    this.setState({
        restaurant_id: restaurant_id,
    })

    console.log('add rating has been clicked!', restaurant_id);
    this.props.dispatch({type: 'SET_RATING_ID', payload: {
        restaurant_id
        }
    })
    this.props.history.push('/rating')
    
  }

  render() {
    const styles = {
        card: {
            width:30+'vw'
        },
        media: {
            height: 300,
            width: 100 + '%'
        },
    };
    return (
        <div>
            <h2>Restaurant Details</h2>
            <div>
                {this.props.state.restaurantDetails.map(restaurant => 
                <Card style={styles.card} key={restaurant.restaurant_id}>
                    <CardMedia
                        image={restaurant.image_url}
                        title={restaurant.name}
                        style={styles.media}
                    />
                <CardContent>
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.address}</p>
                    <a href={restaurant.menu_url}>Menu</a>
                </CardContent>
                </Card>
                )}
            </div>

            <div>
                <h2>Ratings</h2>

                {this.props.state.restaurantDetails.map(restaurant => 
                <ul key={restaurant.restaurant_id}>
                    <li>friendliness rating: {restaurant.friendliness}</li>
                    <li>costliness rating: {restaurant.costliness}</li>
                    <li>comments: {restaurant.comments}</li>
                    <Button onClick={() => this.handleAddRatingClick(restaurant.restaurant_id)}>Add Rating</Button>
                </ul>
                )}
            </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
    state: state,
  });

export default withRouter(connect(mapStateToProps)(RestaurantDetail));
