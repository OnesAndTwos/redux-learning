const counter = (state = [0, 6, 6, 6], action) => {
    switch (action.type) {
        case 'INCREMENT':
            return incrementCounter(state, action.index);
        case 'DECREMENT':
            return decrementCounter(state, action.index);
        case 'ADD_COUNTER':
            return addCounter(state);
        case 'REMOVE_COUNTER':
            return removeCounter(state);
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

const removeCounter = (list) => {
    "use strict";
    return [
        ...list.slice(0, list.length - 1)
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

const decrementCounter = (list, index) => {
    "use strict";
    return [
        ...list.slice(0, index),
        ...[list[index] - 1],
        ...list.slice(index + 1)
    ]
};

const { createStore } = Redux;
const store = createStore(counter);

const Counter = ({values, onIncrement, onDecrement, onAddCounter, onRemoveCounter}) => (
    <div>
        {[...values].map((value, index) => (
            <div key={index}>
                <h1>{value}</h1>
                <button onClick={() => store.dispatch({type: 'INCREMENT', index})}>+</button>
                <button onClick={() => store.dispatch({type: 'DECREMENT', index})}>-</button>
            </div>
        ))}
        <div>
            <button onClick={onAddCounter}>Add counter</button>
            <button onClick={onRemoveCounter}>Remove counter</button>
        </div>
    </div>
);

const render = () => {
    "use strict";

    ReactDOM.render(
        <Counter
            values={store.getState()}
            onAddCounter={() => store.dispatch({type: 'ADD_COUNTER'})}
            onRemoveCounter={() => store.dispatch({type: 'REMOVE_COUNTER'})}
        />,
        document.getElementById('counter')
    );
};

store.subscribe(render);

render();

/*********************************/

const deepFreeze = require('deep-freeze');

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
        removeCounter(beforeList)
    ).toEqual([1, 2]);
};

const testIncrementCounter = () => {
    var beforeList = [1, 2, 4];

    deepFreeze(beforeList);

    expect(
        incrementCounter(beforeList, 1)
    ).toEqual([1, 3, 4]);
};

[
    testAddCounter,
    testRemoveCounter,
    testIncrementCounter

].forEach(t => t.call());

console.log("Everything working like clockwork");