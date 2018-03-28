import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Post } from '../types/index';

const headers = new Headers({
  "Content-Type": "application/json"
});

interface PostsListProps {
  posts: Post[];
}

interface PostsListState {}

class PostList extends React.Component<PostsListProps, PostsListState> {
  render() {
    return this.props.posts.map(post => {
      return (
        <div className="card top20">
          <div className="card-body">
            <h5 className="card-title"><b>{post.title}</b></h5>
            <p className="card-text">{post.body}</p>
          </div>
        </div>
      );
    });
  }
}

interface PostFormProps {
  afterSubmit: Function;
}

interface PostFormState {
  title: string;
  body: string;
}

class PostForm extends React.Component<PostFormProps, PostFormState> {
  constructor(props: PostFormProps) {
    super(props);
    this.state = { title: "", body: "" };
    this.setTitle = this.setTitle.bind(this);
    this.setBody = this.setBody.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  setTitle(event: React.ChangeEvent<HTMLInputElement>) {
    const title = event.target.value;
    this.setState({ title });
  }

  setBody(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const body = event.target.value;
    this.setState({ body });
  }

  submitForm() {
    const body = JSON.stringify({
      post: {
        title: this.state.title,
        body: this.state.body,
      }
    });

    fetch(`/api/posts`, {
      headers,
      body,
      method: "post"
    })
    .then(rest => {
      rest.json().then(post => {
        this.props.afterSubmit(post);
        this.setState({ title: "", body: "" });
      });
    })
    .catch(response => new Error(response));
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label>Title:</label>
            <input type="text" value={this.state.title} onChange={this.setTitle} className="form-control"/>
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Body:</label>
            <textarea value={this.state.body} onChange={this.setBody} className="form-control"/>
          </div>
        </div>
        <div className="col-md-12">
          <div className="btn-group pull-right">
            <button onClick={this.submitForm} className="btn btn-primary">Create</button>
          </div>
        </div>
      </div>
    );
  }
}

interface Props {}

interface State {
  posts: Post[];
}

class Posts extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { posts: []};
    this.updatePostList = this.updatePostList.bind(this);
  }

  componentWillMount() {
    fetch(`/api/posts`, { headers })
    .then(res => {
      res.json().then(posts => this.setState({ posts }));
    })
    .catch(response => new Error(response));
  }

  updatePostList(post: Post) {
    const posts = this.state.posts;
    posts.push(post);
    this.setState({ posts: posts });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm afterSubmit={this.updatePostList} />
          </div>
        </div>
        <div className="row top20">
          <div className="col-md-12">
            <h2>Posts</h2>
            <hr/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <PostList posts={this.state.posts} />
          </div>
        </div>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('posts');

  ReactDOM.render(<Posts />, node);
});
