import React, { Component } from 'react';
import { connect } from 'react-redux';


class DetailButton extends Component {

    handleMoreDetailsClick = (id) => {
        this.props.dispatch({
            type: 'GET_RESTAURANT_DETAIL',
            payload: id
        });
    }

  render() {

    return (  
            <div>
                <button onClick={this.handleMoreDetailsClick(this.props.id)}>More Details</button>
            </div>    
    );
  }
}

const mapStateToProps = state => ({
    state: state,
  });

export default connect(mapStateToProps)(DetailButton);
