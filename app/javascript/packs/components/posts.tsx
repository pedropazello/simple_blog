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
    return (
      <ul>
       {
          this.props.posts.map(post => {
            return (<li key={post.id}><b>Title:</b> {post.title}, <b>Body:</b> {post.body}</li>)
          })
        }
      </ul>
    )
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
      <div>
        <label>Title:</label>
        <input type="text" value={this.state.title} onChange={this.setTitle}/><br/>
        <label>Body:</label>
        <textarea value={this.state.body} onChange={this.setBody}/><br/>
        <button onClick={this.submitForm}>Create</button>
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
      <div>
        <PostList posts={this.state.posts} />
        <PostForm afterSubmit={this.updatePostList} />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('posts');

  ReactDOM.render(<Posts />, node);
});
