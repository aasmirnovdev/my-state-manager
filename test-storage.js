import { createStore } from "./src/state/core.js";


const store = createStore({x: 0, y: 0});

// логирующее middleware
function logMiddleware(prev, next) {
  console.log('[state changed]', {
    prev,
    next
  });
  return next; // обязательно вернуть новое состояние без изменений
}

function updateValue() {
  console.log(store.getState());
}
store.use(logMiddleware);

const unsubscribe = store.subscribe(updateValue);

store.setState({x: 1});
store.setState({x: 2});
store.setState(prevState => ({...prevState, y: 2}));
unsubscribe();
store.setState({x: 3});
