import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import todoApp from './reducers/todoApp';
import VisibleTodoList from './containers/VisibleTodoList';

import AddTodo from './containers/AddTodo';
import Footer from './containers/Footer';

const TodoApp = () => {
    return (
        <div>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>
    )
};

ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <TodoApp />
    </Provider>,
    document.getElementById("todo")
);