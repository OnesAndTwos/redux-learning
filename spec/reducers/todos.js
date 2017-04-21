import deepFreeze from 'deep-freeze';
import expect from 'expect';

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