import React from 'react';

import VisibleTodoList from './VisibleTodoList';
import AddTodo from './AddTodo';
import Footer from './Footer';

export default ({match}) => {
    return (
        <div>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>
    )
};