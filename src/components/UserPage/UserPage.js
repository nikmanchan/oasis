import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Button, Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle } from 'reactstrap';
import './UserPage.css'
import { withRouter } from 'react-router-dom';


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
// const UserPage = (props) => (
  //   <div className="UserPage">
  //     <h1 className="UserHeader">Your search is now over.</h1>
  //     <Button onClick={handleClick} className="UserButton">Let's get started</Button>
  //   </div>
  // );
  
  class UserPage extends Component {
    handleClick = () => {
    
      this.props.history.push('/map')
      
    }

  render() {

    return (
      <div className="UserPage">
        <h1 className="UserHeader">Your search is now over.</h1>
        <Button onClick={this.handleClick} className="UserButton">Let's get started</Button>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
// export default connect(mapStateToProps)(UserPage);
export default withRouter(connect(mapStateToProps)(UserPage));

