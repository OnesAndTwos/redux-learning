import React, {PropTypes} from 'react';

let nextTodoId = 0;

const AddTodo = (props, {store}) => {
    let input;

    return (
        <div>
            <input ref={ node => input = node }/>
            <button onClick={() => {

                    store.dispatch({
                        type: 'ADD_TODO',
                        text: input.value,
                        id: nextTodoId++
                    });

                    input.value= '';

                }}>
                Add Todo
            </button>
        </div>
    )
};

AddTodo.contextTypes = {
    store: PropTypes.object
};

export default AddTodo;