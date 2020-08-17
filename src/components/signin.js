/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import {
  InputGroup, FormControl, Container, Row, Col, Button,
} from 'react-bootstrap';
import { signinUser } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.signinUser(this.state, this.props.history);
  }

  onBack = () => {
    this.props.history.push('/');
  }

  renderSignin() {
    return (
      <Row>
        <Col>
          <h4>Email</h4>
          <InputGroup id="email" className="mb-3" onChange={this.onEmailChange} value={this.state.email}>
            <FormControl
              aria-label="Title"
              placeholder="Email"
            />
          </InputGroup>
          <h4>Password</h4>
          <InputGroup id="password" className="mb-3" onChange={this.onPasswordChange} value={this.state.password}>
            <FormControl
              aria-label="Tags"
              placeholder="Password"
            />
          </InputGroup>
          <Button variant="primary" onClick={this.onSubmit}>Submit</Button>{' '}
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <Container>
        <IconContext.Provider value={{ size: '1.5em' }}>
          <FaArrowAltCircleLeft className="back-button" onClick={this.onBack} />
        </IconContext.Provider>
        <h2 className="create-title">Sign In</h2>
        {this.renderSignin()}
      </Container>
    );
  }
}

export default withRouter(connect(null, { signinUser })(SignIn));
