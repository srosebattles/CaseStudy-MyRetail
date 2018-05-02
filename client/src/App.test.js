import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

//
// it('renders add cart button when available online', () => {
//
// });
//
// it('renders pick up in store button when available in store', () => {
//
// });
//
// it('does not render add cart button when not available online', () => {
//
// });
//
// it('does not render pick up in store button when not available in store', () => {
//
// });
