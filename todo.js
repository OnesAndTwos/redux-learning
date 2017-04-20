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

            return {...state, completed: !state.completed};
        default:
            return state;
    }

};

const todos = (state = [], action) => {

    switch (action.type) {
        case 'ADD_TODO':
            return [...state, todo(undefined, action)];
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
const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const { createStore } = Redux;
const store = createStore(todoApp);

const { Component } = React;

let nextTodoId = 0;

const render = () => ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.getElementById("todo")
);

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

const onClickTodo = (id) => {
    store.dispatch({
        type: 'TOGGLE_TODO', id
    });
};

const Todo = ({onClick, completed, text}) => (
    <li onClick={onClick} style={{ textDecoration: completed ? 'line-through': 'none' }}>{text}</li>
);

const TodoList = ({todos, onTodoClick}) => (
    <ul>
        {
            todos.map(todo => (<Todo key={todo.id} {...todo} onClick={() => onClickTodo(todo.id)}/>))
        }
    </ul>
);


const AddTodo = ({onAddClick}) => {
    let input;

    return (
        <div>
            <input ref={ node => input = node }/>
            <button onClick={() => {
                    onAddClick(input.value);
                    input.value= '';
                }}>
                Add Todo
            </button>
        </div>
    )
};


const Footer = () => {
    return (
        <p>
            Show: { ' ' }
            <FilterLink filter="SHOW_ALL">All</FilterLink>{ ' ' }
            <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>{ ' ' }
            <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
        </p>
    )
};

class FilterLink extends Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const state = store.getState();

        return (
            <Link active={
                props.filter === state.visibilityFilter
            } onClick={() =>
                store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter:props.filter
                })
            }>{props.children}</Link>
        );

    }

}

const Link = ({active, children, onClick}) => {
    if (active) {
        return <span>{children}</span>
    }

    return (
        <a href='#'
           onClick={(e) => {
            e.preventDefault();
            onClick();
           }}>{children}</a>
    )
};

const TodoApp = ({ todos, visibilityFilter }) => {
    return (
        <div>
            <AddTodo
                onAddClick={
                        text => store.dispatch({
                            type: 'ADD_TODO',
                            text: text,
                            id: nextTodoId++
                        })
                    }
            />

            <TodoList
                todos={
                    getVisibleTodos(todos, visibilityFilter)
                }
                onTodoClick={
                        id => store.dispatch({
                            type: 'TOGGLE_TODO',
                            id
                        })
                    }
            />

            <Footer />

        </div>
    );
};

store.subscribe(render);

render();

/*********************************/

const deepFreeze = require('deep-freeze');

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