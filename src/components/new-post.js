import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  InputGroup, FormControl, Container, Row, Col,
} from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';
import { FaSave, FaTrashAlt, FaArrowAltCircleLeft } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { createPost } from '../actions';

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      tags: '',
      coverUrl: '',
    };
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

  onSave = () => {
    this.props.createPost({ ...this.state }, this.props.history);
  }

  onDelete = () => {
    this.props.history.push('/');
  }

  // bootstrap form for content adapted from: https://react-bootstrap.github.io/components/forms/
  // bootstrap input for title, tags, and coverUrl from: https://react-bootstrap.github.io/components/input-group/\
  // code to make icons bigger using IconContext adapted from: https://github.com/react-icons/react-icons
  // used same TextareaAutosize as I did in Lab 3
  renderNewPost() {
    return (
      <Row>
        <Col>
          <h4>Title</h4>
          <InputGroup id="title" className="mb-3" onChange={this.onTitleChange} value={this.state.title}>
            <FormControl
              aria-label="Title"
            />
          </InputGroup>
          <h4>Tags</h4>
          <InputGroup id="tags" className="mb-3" onChange={this.onTagsChange} value={this.state.tags}>
            <FormControl
              aria-label="Tags"
            />
          </InputGroup>
          <h4>Content</h4>
          <TextareaAutosize className="input-box"
            placeholder="(Markdown supported)"
            value={this.state.content}
            onChange={this.onContentChange}
            minRows={8}
          />
          <h4>Cover Image URL</h4>
          <InputGroup id="coverUrl" className="mb-3" onChange={this.onUrlChange} value={this.state.coverUrl}>
            <FormControl
              aria-label="coverUrl"
            />
          </InputGroup>
          <IconContext.Provider value={{ size: '1.5em' }}>
            <FaTrashAlt className="new-post-button" onClick={this.onDelete} />
            <FaSave className="new-post-button" onClick={this.onSave} />
          </IconContext.Provider>
        </Col>
      </Row>
    );
  }

  render() {
    console.log('newpost');
    return (
      <Container>
        <IconContext.Provider value={{ size: '1.5em' }}>
          <FaArrowAltCircleLeft className="back-button" onClick={this.onDelete} />
        </IconContext.Provider>
        <h2 className="create-title">Create A New Post</h2>
        {this.renderNewPost()}
      </Container>
    );
  }
}

export default withRouter(connect(null, { createPost })(NewPost));
