import React from 'react';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import todoApp from './reducers/todoApp';
import TodoApp from './components/TodoApp';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = createStore(todoApp, preloadedState);

render(
    <Provider store={store}>
        <TodoApp />
    </Provider>,
    document.getElementById("todo")
);