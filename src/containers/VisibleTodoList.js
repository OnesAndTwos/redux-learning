import React from 'react';
import { connect } from 'react-redux';

import { toggleTodo } from './../actions/index'

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: id => dispatch(toggleTodo(id))
    }
};

const getVisibleTodos = (todos, filter) => {

    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        default:
            return todos;
    }

};

const Todo = ({onClick, completed, text}) => (
    <li onClick={onClick} style={{ textDecoration: completed ? 'line-through': 'none' }}>{text}</li>
);

const TodoList = ({todos, onTodoClick}) => (
    <ul>
        {
            todos.map(todo => (<Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)}/>))
        }
    </ul>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);
