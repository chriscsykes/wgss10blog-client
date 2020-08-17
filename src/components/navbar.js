/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { FaPlusCircle, FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { signoutUser } from '../actions';

// eslint-disable-next-line react/prefer-stateless-function
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.onSignOut = this.onSignOut.bind(this);
  }

  onSignOut() {
    this.props.signoutUser(this.props.history);
  }

  render() {
    return (
      <Navbar className="navBar" bg="light" variant="light">
        <Navbar.Brand className="website-title" as={Link} to="/">My Blog</Navbar.Brand>
        {this.props.authenticated
          ? (
            <IconContext.Provider value={{ size: '2em' }}>
              <Nav className="ml-auto">
                <Nav.Link className="navbar-links" onClick={this.onSignOut}>Sign Out</Nav.Link>
                <Nav.Link as={Link} to="/"><FaBars /></Nav.Link>
                <Nav.Link as={Link} to="/posts/new"><FaPlusCircle /></Nav.Link>
              </Nav>
            </IconContext.Provider>
          )
          : (
            <IconContext.Provider value={{ size: '2em' }}>
              <Nav className="ml-auto">
                <Nav.Link className="navbar-links" as={Link} to="/signin">Sign In</Nav.Link>
                <Nav.Link className="navbar-links" as={Link} to="/signup">Sign Up</Nav.Link>
                <Nav.Link as={Link} to="/posts/new"><FaPlusCircle /></Nav.Link>
              </Nav>
            </IconContext.Provider>
          )}
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => (
  {
    authenticated: state.auth.authenticated,
  }
);

export default withRouter(connect(mapStateToProps, { signoutUser })(NavBar));