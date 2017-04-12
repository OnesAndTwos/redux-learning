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

expect(
    counter(1, { type: 'INCREMENT'})
).toEqual(2);

/*********************************/

//const { createStore } = Redux;

const createStore = (reducer) => {
    "use strict";

    let state;
    let listeners = [];

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    };

    const getState = () => state;

    dispatch({});

    return { dispatch, subscribe, getState };
};

const store = createStore(counter);

console.log("Initial state: ", store.getState());

store.dispatch({ type: 'INCREMENT'});

console.log("Final state: ", store.getState());

const render = () => {
    "use strict";
    document.body.innerText = store.getState();
};

store.subscribe(render);

store.dispatch({ type: 'INCREMENT'});
store.dispatch({ type: 'INCREMENT'});
store.dispatch({ type: 'INCREMENT'});
store.dispatch({ type: 'INCREMENT'});
store.dispatch({ type: 'INCREMENT'});
store.dispatch({ type: 'INCREMENT'});
store.dispatch({ type: 'INCREMENT'});
store.dispatch({ type: 'INCREMENT'});
store.dispatch({ type: 'INCREMENT'});
store.dispatch({ type: 'INCREMENT'});
store.dispatch({ type: 'INCREMENT'});
store.dispatch({ type: 'INCREMENT'});
store.dispatch({ type: 'INCREMENT'});

setTimeout(() => {
    store.dispatch({ type: 'INCREMENT'})
}, 1000);

document.addEventListener('click', () => {
    "use strict";
    store.dispatch({ type: 'INCREMENT'})
});

/*********************************/

console.log("Everything working like clockwork");