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
import uploadImage from '../actions/s3';

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      tags: '',
      coverUrl: '',
      authorName: '',
    };
  }

  onImageUpload = (event) => {
    const file = event.target.files[0];
    // Handle null file
    // Get url of the file and set it to the src of preview
    if (file) {
      this.setState({ preview: window.URL.createObjectURL(file), file });
    }
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
    if (this.state.file) {
      uploadImage(this.state.file).then((url) => {
        // use url for content_url and
        // either run your createPost actionCreator
        // or your updatePost actionCreator
        console.log(url);
        this.props.createPost({ ...this.state, authorName: this.props.username }, this.props.history);
      }).catch((error) => {
        // handle error
        console.log(error);
      });
    }
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
          <h4>Upload Image</h4>
          <img id="preview" alt="preview" src={this.state.preview} />
          <input type="file" name="coverImage" onChange={this.onImageUpload} />

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

function mapStateToProps(reduxState) {
  return {
    username: reduxState.auth.username,
  };
}
export default withRouter(connect(mapStateToProps, { createPost })(NewPost));
