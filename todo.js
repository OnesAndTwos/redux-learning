const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }

};

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const { combineReducers } = Redux;

//const combineReducers = (reducers) => {
//    return (state = {}, action) => {
//        return Object
//            .keys(reducers)
//            .reduce((nextState, key) => {
//                nextState[key] = reducers[key](
//                    state[key],
//                    action
//                );
//                return nextState;
//            }, {});
//    };
//};

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const { createStore } = Redux;

const store = createStore(todoApp);

const render = () => {
    ReactDOM.render(
        <TodoApp {...store.getState()} />,
        document.getElementById("todo")
    )
};

const { Component } = React;

let nextTodoId = 0;


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

const FilterLink = ({filter, currentFilter, children}) => {
    if(currentFilter === filter) {
        return <span>{children}</span>
    }

    return (
        <a href='#'
           onClick={(e) => {
            e.preventDefault();
            store.dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter
            });
           }}>{children}</a>
    )
};



class TodoApp extends Component {

    render() {

        const { todos, visibilityFilter } = this.props;
        const visibleTodos = getVisibleTodos(todos, visibilityFilter);

        return (
            <div>
                <input ref={ node => this.input = node }/>
                <button onClick={() => {

                store.dispatch({
                    type: 'ADD_TODO',
                    text: this.input.value,
                    id: nextTodoId++
                });
                this.input.value= '';

                }}>Add Todo
                </button>
                <ul>
                    {visibleTodos.map(todo =>
                        <li key={todo.id}
                            onClick={() => { store.dispatch({
                                    type: 'TOGGLE_TODO',
                                    id: todo.id
                                });
                            }}
                            style={{ textDecoration: todo.completed ? 'line-through': 'none'
                        }}>{todo.text}</li>
                    )}
                </ul>
                <p>
                    Show: { ' ' }
                        <FilterLink currentFilter={visibilityFilter} filter="SHOW_ALL">All</FilterLink>{ ' ' }
                        <FilterLink currentFilter={visibilityFilter} filter="SHOW_ACTIVE">Active</FilterLink>{ ' ' }
                        <FilterLink currentFilter={visibilityFilter} filter="SHOW_COMPLETED">Completed</FilterLink>
                </p>
            </div>
        );

    }
}

store.subscribe(render);

render();

/*********************************/

const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: "Learn Redux"
    };

    deepFreeze(action);
    deepFreeze(stateBefore);

    expect(
        todos(stateBefore, action)
    ).toEqual([
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ])
};

const testToggleTodo = () => {
    const todoBefore = {
        id: 1,
        text: "Hello",
        completed: false
    };

    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    };

    deepFreeze(todoBefore);
    deepFreeze(action);

    expect(
        todos([todoBefore], action)
    ).toEqual([{
        id: 1,
        text: "Hello",
        completed: true
    }])

};

[
    testToggleTodo,
    testAddTodo
].map(test => test.call());

console.log("Everything working like clockwork");