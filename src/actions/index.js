import { v4 } from 'node-uuid';

const addTodo = (text) => {

    return {
        type: 'ADD_TODO',
        id: v4(),
        text
    };

};

const toggleTodo = (id) => {

    return {
        type: 'TOGGLE_TODO',
        id
    };

};

export { addTodo, toggleTodo };