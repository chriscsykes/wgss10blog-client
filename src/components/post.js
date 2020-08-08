/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  InputGroup, FormControl, Container, Row, Col, Button,
} from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';
import marked from 'marked';
import { fetchPost, updatePost, deletePost } from '../actions';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      tags: '',
      coverUrl: '',
      isEditing: false,
    };
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
    console.log('fetched!');
  }

  onUpdate = () => {
    this.setState({ isEditing: false });
    const post = {
      title: this.state.title,
      tags: this.state.tags,
      content: this.state.content,
      coverUrl: this.state.coverUrl,
    };
    this.props.updatePost(this.props.match.params.postID, post);
  }

  onDelete = () => {
    this.props.deletePost(this.props.match.params.postID, this.props.history);
  }

  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  onTagsChange = (event) => {
    this.setState({ tags: event.target.value });
  }

  onContentChange = (event) => {
    this.setState({ content: event.target.value });
  }

  onUrlChange = (event) => {
    this.setState({ coverUrl: event.target.value });
  }

  toggleIsEditing = () => {
    this.setState({
      title: this.props.currentPost.title,
      tags: this.props.currentPost.tags,
      content: this.props.currentPost.content,
      coverUrl: this.props.currentPost.coverUrl,
      isEditing: true,
    });
  }

  // render based on whether is currently editing or not
  renderTitle = () => {
    if (this.state.isEditing) {
      return (
        <InputGroup id="title" className="mb-3">
          <FormControl
            onChange={this.onTitleChange}
            value={this.state.title}
            aria-label="Title"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      );
    } else {
      return (
        <h1>
          {this.props.currentPost.title}
        </h1>
      );
    }
  }

  renderTags = () => {
    if (this.state.isEditing) {
      return (
        <InputGroup id="tags" className="mb-3">
          <FormControl
            onChange={this.onTagsChange}
            value={this.state.tags}
            aria-label="Tags"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      );
    } else {
      return (
        <h1>
          {this.props.currentPost.tags}
        </h1>
      );
    }
  }

  renderContent = () => {
    if (this.state.isEditing) {
      return (
        <TextareaAutosize className="input-box"
          placeholder="(Markdown supported)"
          value={this.state.content}
          onChange={this.onContentChange}
          minRows={8}
        />
      );
    } else {
      return (
        <h1>
          <div id="content" dangerouslySetInnerHTML={{ __html: marked(this.props.currentPost.content || '') }} />
        </h1>
      );
    }
  }

  renderCoverUrl = () => {
    if (this.state.isEditing) {
      return (
        <InputGroup id="coverUrl" className="mb-3">
          <FormControl
            onChange={this.onUrlChange}
            value={this.state.coverUrl}
            aria-label="coverUrl"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      );
    } else {
      return (
        <img id="coverImage" src={this.props.currentPost.coverUrl} alt="coverURL" />

      );
    }
  }

  renderDeleteButton = () => {
    return (
      <Button variant="primary" onClick={this.onDelete}>Delete</Button>
    );
  }

  renderSaveEditButton = () => {
    if (this.state.isEditing) {
      return (
        <Button variant="primary" onClick={this.onUpdate}>Save</Button>
      );
    } else {
      return (
        <Button variant="primary" onClick={this.toggleIsEditing}>Edit</Button>
      );
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            {this.renderTitle()}
            {this.renderTags()}
            {this.renderContent()}
            {this.renderCoverUrl()}
            {this.renderDeleteButton()}
            {this.renderSaveEditButton()}
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    currentPost: reduxState.posts.current,
  };
}

// enables this.props.currentPost
// and this.props.fetchPost, this.props.deletePost, and this.props.updatePost
export default connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post);
