import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface HelloProps {
 name: string,
}

const Hello: React.SFC<HelloProps> = (props) => {
 return <div>Hello, {props.name}</div>;
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name="React with Typescript" />,
    document.body.appendChild(document.createElement('div')),
  )
})