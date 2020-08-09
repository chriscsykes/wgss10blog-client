import React from 'react';
import '../style.scss';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { FaPlusCircle, FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import Post from './post';
import NewPost from './new-post';
import Posts from './posts';

// bootstrap navbar code adapted from: https://react-bootstrap.github.io/components/navbar/
// code for connecting bootstrap nav links adapted from: https://stackoverflow.com/questions/54843302/reactjs-bootstrap-navbar-and-routing-not-working-together
const App = (props) => {
  return (
    <Router>
      <div className="web-body">
        <Navbar className="navBar" bg="light" variant="light">
          <Navbar.Brand className="website-title" as={Link} to="/">My Blog</Navbar.Brand>
          <IconContext.Provider value={{ size: '2em' }}>
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/"><FaBars /></Nav.Link>
              <Nav.Link as={Link} to="/posts/new"><FaPlusCircle /></Nav.Link>
            </Nav>
          </IconContext.Provider>
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
