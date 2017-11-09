import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom'

import TodoApp from './TodoApp';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/:filter?" component={TodoApp} />
    </BrowserRouter>

  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;