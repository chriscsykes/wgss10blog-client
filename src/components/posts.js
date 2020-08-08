import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { fetchPosts } from '../actions';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  // bootstrap card adapted from https://react-bootstrap.github.io/components/cards/
  render() {
    if (this.props.posts == null) {
      return (<div />);
    } else {
      console.log('passed!');
      return (
        <div>
          <h1>Posts</h1>
          <div className="all-posts-display">
            {this.props.posts.map((post) => {
              return (
                <NavLink to={`/posts/${post.id}`} key={post.id}>
                  <Card className="bootstrap-card">
                    <Card.Body>
                      <Card.Img variant="top" src={post.coverUrl} id="cover-image" />
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>
                        {post.tags}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </NavLink>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.all,
});

export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));
