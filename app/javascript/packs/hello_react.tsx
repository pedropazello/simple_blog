import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface HelloProps {
 name: string,
}

const Hello: React.SFC<HelloProps> = (props) => {
 return <div>Hello, {props.name}</div>;
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('hello-react');
  const name = node.getAttribute('data-name');

  ReactDOM.render(<Hello name={name} />, node);
});