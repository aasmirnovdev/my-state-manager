import { createStore } from "./src/state/core.js";


const store = createStore({x: 0});

console.log(store.getState());

console.log(store.setState(prev => ({...prev, x: prev.x + 1})));

console.log(store.getState());