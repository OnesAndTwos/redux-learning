import { createStore } from 'redux';
import { loadState, saveState } from './localStorage';
import todoApp from './reducers/todoApp';
import throttle from 'lodash/throttle';

const configureStore = () => {

  const store = createStore(todoApp, loadState());

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos
    });
  }, 1000));

  return store;

};

export default configureStore;