/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import {
  InputGroup, FormControl, Container, Row, Col, Button,
} from 'react-bootstrap';
import { signupUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      author: '',
    };
  }

    onAuthorChange = (event) => {
      this.setState({ author: event.target.value });
    }

    onEmailChange = (event) => {
      this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
      this.setState({ password: event.target.value });
    }

    onSubmit = (event) => {
      console.log('submitted');

      event.preventDefault();
      this.props.signupUser(this.state, this.props.history);
    }

    onBack = () => {
      this.props.history.push('/');
    }

    renderSignin() {
      return (
        <Row>
          <Col>
            <h4>Name</h4>
            <InputGroup id="author" className="mb-3" onChange={this.onAuthorChange} value={this.state.author}>
              <FormControl
                aria-label="Title"
                placeholder="Email"
              />
            </InputGroup>
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
          <h2 className="create-title">Sign Up</h2>
          {this.renderSignin()}
        </Container>
      );
    }
}

export default withRouter(connect(null, { signupUser })(SignUp));
