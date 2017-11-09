import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { toggleTodo } from '../actions/index'

const mapStateToProps = (state, { match }) => {
    return {
        todos: getVisibleTodos(state.todos, match.params.filter)
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: id => dispatch(toggleTodo(id))
    }
};

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'all':
            return todos;
        case 'completed':
            return todos.filter(t => t.completed);
        case 'active':
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

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList));
