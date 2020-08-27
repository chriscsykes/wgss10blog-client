/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  InputGroup, FormControl, Container, Row, Col,
} from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';
import marked from 'marked';
import {
  FaSave, FaTrashAlt, FaArrowAltCircleLeft, FaEdit,
} from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { fetchPost, updatePost, deletePost } from '../actions';
import uploadImage from '../actions/s3';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      tags: '',
      imageURL: '',
      coverUrl: '',
      isEditing: false,
    };
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
    console.log('fetched!');
  }

  onImageUpload = (event) => {
    const file = event.target.files[0];
    // Handle null file
    // Get url of the file and set it to the src of preview
    if (file) {
      this.setState({ preview: window.URL.createObjectURL(file), file });
    }
  }

  onUpdate = () => {
    if (this.state.file) {
      uploadImage(this.state.file).then((url) => {
        this.setState({ isEditing: false });
        this.setState({ imageURL: url });
        const post = {
          title: this.state.title,
          tags: this.state.tags,
          content: this.state.content,
          imageURL: this.state.imageURL,
          coverUrl: this.state.coverUrl,
        };
        this.props.updatePost(this.props.match.params.postID, post);
      }).catch((error) => {
        // handle error
        console.log(error);
      });
    } else {
      this.setState({ isEditing: false });
      const post = {
        title: this.state.title,
        tags: this.state.tags,
        content: this.state.content,
        imageURL: this.state.imageURL,
        coverUrl: this.state.coverUrl,
      };
      this.props.updatePost(this.props.match.params.postID, post);
    }
  }

  onDelete = () => {
    this.props.deletePost(this.props.match.params.postID, this.props.history);
  }

  onBack = () => {
    this.props.history.push('/');
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

  // bootstrap input for title, tags, and coverUrl from: https://react-bootstrap.github.io/components/input-group/\
  renderTitle = () => {
    if (this.state.isEditing) {
      return (
        <div>
          <h4>Title</h4>
          <InputGroup id="title" className="mb-3">
            <FormControl
              onChange={this.onTitleChange}
              value={this.state.title}
              aria-label="Title"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
      );
    } else {
      return (
        <h1 className="title">
          {this.props.currentPost.title}
        </h1>
      );
    }
  }

  renderAuthor = () => {
    return (
      <h5>Posted By: {this.props.currentPost.authorName}</h5>
    );
  }

  renderTags = () => {
    if (this.state.isEditing) {
      return (
        <div>
          <h4>Tags</h4>
          <InputGroup id="tags" className="mb-3">
            <FormControl
              onChange={this.onTagsChange}
              value={this.state.tags}
              aria-label="Tags"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
      );
    } else {
      return (
        <h5 className="tags">
          {this.props.currentPost.tags}
        </h5>
      );
    }
  }

  renderImageURL = () => {
    if (this.state.isEditing) {
      return (
        <div>
          <h4>Upload Image</h4>
          <img id="preview" alt="preview" src={this.state.preview} />
          <input type="file" name="coverImage" value={this.state.imageURL} onChange={this.onImageUpload} />
        </div>
      );
    } else {
      return (
        <div>
          <img id="imageURL" alt="imgURL" src={this.props.currentPost.imageURL} />
        </div>
      );
    }
  }

  renderContent = () => {
    if (this.state.isEditing) {
      return (
        <div>
          <h4>Content</h4>
          <TextareaAutosize className="input-box"
            placeholder="(Markdown supported)"
            value={this.state.content}
            onChange={this.onContentChange}
            minRows={8}
          />
        </div>
      );
    } else {
      return (
        <p id="content" dangerouslySetInnerHTML={{ __html: marked(this.props.currentPost.content || '') }} />
      );
    }
  }

  renderCoverUrl = () => {
    if (this.state.isEditing) {
      return (
        <div>
          <h4>Cover Image URL</h4>
          <InputGroup id="coverUrl" className="mb-3">
            <FormControl
              onChange={this.onUrlChange}
              value={this.state.coverUrl}
              aria-label="coverUrl"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
      );
    } else {
      return (
        <img id="coverImage" src={this.props.currentPost.coverUrl} alt="coverURL" />

      );
    }
  }

  // code to make icons bigger using IconContext adapted from: https://github.com/react-icons/react-icons
  renderButtons = () => {
    if (this.state.isEditing) {
      return (
        <div>
          <IconContext.Provider value={{ size: '1.5em' }}>
            <FaArrowAltCircleLeft className="post-buttons" onClick={this.onBack} />
            <FaTrashAlt className="post-buttons" onClick={this.onDelete} />
            <FaSave className="post-buttons" onClick={this.onUpdate} />
          </IconContext.Provider>
        </div>
      );
    } else {
      return (
        <div>
          <IconContext.Provider value={{ size: '1.5em' }}>
            <FaArrowAltCircleLeft className="post-buttons" onClick={this.onBack} />
            <FaTrashAlt className="post-buttons" onClick={this.onDelete} />
            <FaEdit className="post-buttons" onClick={this.toggleIsEditing} />
          </IconContext.Provider>
        </div>
      );
    }
  }

  render() {
    return (
      <Container className="note-container">
        <Row>
          <Col>
            {this.renderButtons()}
          </Col>
        </Row>
        <Row>
          <Col>
            {this.renderTitle()}
            {this.renderAuthor()}
            {this.renderTags()}
            {this.renderImageURL()}
            {this.renderContent()}
            {this.renderCoverUrl()}
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
