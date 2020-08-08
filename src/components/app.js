import React from 'react';
import '../style.scss';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import Post from './post';
import NewPost from './new-post';
import Posts from './posts';

// bootstrap navbar code adapted from: https://react-bootstrap.github.io/components/navbar/
const App = (props) => {
  return (
    <Router>
      <div>
        <Navbar className="navBar" bg="light" variant="light">
          <Navbar.Brand to="/">My Blog</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/posts/new">New Post</Nav.Link>
            <Nav.Link as={Link} to="/">Posts</Nav.Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={NewPost} />
          <Route path="/posts/:postID" component={Post} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
