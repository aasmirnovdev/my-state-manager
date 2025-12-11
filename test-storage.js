import { createStore } from "./src/state/core.js";


const store = createStore({x: 0, y: 0});

function updateValue() {
  console.log('Вызвалась функция')
  console.log(store.getState());
}

const unsubscribe = store.subscribe(updateValue);

store.setState({x: 1});
store.setState({x: 2});
store.setState(prevState => ({...prevState, y: 2}));
unsubscribe();
store.setState({x: 3});