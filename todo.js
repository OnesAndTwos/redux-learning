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