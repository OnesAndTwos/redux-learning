import React from 'react';
import { connect } from 'react-redux';

import { addTodo } from './../actions/index';

export default connect()(({ dispatch }) => {
    let input;

    return (
        <div>
            <input ref={ node => input = node }/>
            <button onClick={() => {
                    dispatch(addTodo(input.value));
                    input.value= '';
                }}>
                Add Todo
            </button>
        </div>
    )
});