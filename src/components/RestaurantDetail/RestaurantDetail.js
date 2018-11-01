import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

class RestaurantDetail extends Component {
    // componentDidMount() {
    //     this.props.dispatch({type: 'GET_RESTAURANTS' });
    
    //   }

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
            {this.props.state.restaurants.map(restaurant => 
            <Card style={styles.card} key={restaurant.id}>
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
    );
  }
}

const mapStateToProps = state => ({
    state: state,
  });

export default connect(mapStateToProps)(RestaurantDetail);

