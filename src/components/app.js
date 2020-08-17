import React from 'react';
import '../style.scss';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './navbar';
import Post from './post';
import NewPost from './new-post';
import Posts from './posts';
import SignIn from './signin';
import SignUp from './signup';
import PrivateRoute from './privateRoute';

// bootstrap navbar code adapted from: https://react-bootstrap.github.io/components/navbar/
// code for connecting bootstrap nav links adapted from: https://stackoverflow.com/questions/54843302/reactjs-bootstrap-navbar-and-routing-not-working-together
const App = (props) => {
  return (
    <Router>
      <div className="web-body">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/posts/new" component={NewPost} />
          <Route path="/posts/:postID" component={Post} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
