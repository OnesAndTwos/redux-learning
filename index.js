const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }

};

const addCounter = (list) => {
    "use strict";
    return [
        ...list, 0
    ]
};

const removeCounter = (list, index) => {
    "use strict";
    return [
        ...list.slice(0, index),
        ...list.slice(index + 1)
    ]
};

const incrementCounter = (list, index) => {
    "use strict";
    return [
        ...list.slice(0, index),
        ...[list[index] + 1],
        ...list.slice(index + 1)
    ]
};

const toggleTodo = (todo) => {
    "use strict";
    todo.completed = !todo.completed
    return todo;
};

const { createStore } = Redux;
const store = createStore(counter);

const Counter = ({value, onIncrement, onDecrement}) => (
    <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
);

const render = () => {
    "use strict";

    ReactDOM.render(
        <Counter
            value={store.getState()}
            onIncrement={() => store.dispatch({type: 'INCREMENT'})}
            onDecrement={() => store.dispatch({type: 'DECREMENT'})}
        />,
        document.getElementById('root')
    );
};

store.subscribe(render);

render();

/*********************************/

const testCounter = () => {
    expect(
        counter(1, {type: 'INCREMENT'})
    ).toEqual(2);
};

const testAddCounter = () => {
    var beforeList = [1, 2];

    deepFreeze(beforeList);

    expect(
        addCounter(beforeList)
    ).toEqual([1, 2, 0]);
};

const testRemoveCounter = () => {
    var beforeList = [1, 2, 4];

    deepFreeze(beforeList);

    expect(
        removeCounter(beforeList, 1)
    ).toEqual([1, 4]);
};


const testIncrementCounter = () => {
    var beforeList = [1, 2, 4];

    deepFreeze(beforeList);

    expect(
        incrementCounter(beforeList, 1)
    ).toEqual([1, 3, 4]);
};

const testToggleTodo = () => {
    var toDoBefore = {
        id: 0, text: 'Learn redux',
        completed: false
    };

    expect(
        toggleTodo(toDoBefore)
    ).toEqual({
        id: 0, text: 'Learn redux',
        completed: true
    });
};

[

    testCounter,
    testAddCounter,
    testRemoveCounter,
    testIncrementCounter,
    testToggleTodo

].forEach(t => t.call());

console.log("Everything working like clockwork");