import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
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
  renderCards = () => {
    return (
      <Container>
        <Row>
          <Col>
            <div className="all-posts-display">
              {this.props.posts.map((post) => {
                return (
                  <NavLink to={`/posts/${post.id}`} key={post.id}>
                    <Card className="bootstrap-card">
                      <Card.Body className="card-body">
                        <Card.Img variant="top" src={post.coverUrl} id="cover-image" />
                        <Card.Title className="card-title">{post.title}</Card.Title>
                        <Card.Text>{post.tags}</Card.Text>
                      </Card.Body>
                    </Card>
                  </NavLink>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>

    );
  }

  render() {
    if (this.props.posts == null) {
      return (<div />);
    } else {
      console.log('passed!');
      return (
        <div>
          <div>
            <h2 className="posts-title">Posts</h2>
          </div>
          {this.renderCards()}
        </div>
      );
    }
  }
}

const mapStateToProps = (reduxState) => ({
  posts: reduxState.posts.all,
});

export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));
