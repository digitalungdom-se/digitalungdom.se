import React from 'react';
import StarButton from 'components/StarButton';

export default function Startpage() {
  return (
    <div style={{ textAlign: 'center' }}>
      <p>
        Edit
        <code>src/App.tsx</code> and save to reload.
      </p>
      <a className="App-link" href="https://reactjs.org" rel="noopener noreferrer" target="_blank">
        Learn React
      </a>
      <div style={{ padding: 100 }}>
        <StarButton />
      </div>
    </div>
  );
}
