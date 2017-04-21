import React from 'react';

import VisibleTodoList from './../containers/VisibleTodoList';
import AddTodo from './../containers/AddTodo';
import Footer from './../containers/Footer';

export default () => {
    return (
        <div>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>
    )
};