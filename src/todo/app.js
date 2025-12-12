import { createStore } from '../state/core.js';

const taskList = document.getElementById('tasks');
const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;
  addTask(text);
  input.value = '';
});

const store = createStore({
  tasks: []
});

function addTask(text) {
  store.setState(state => ({
    ...state,
    tasks: [
      ...state.tasks,
      {id: Date.now(), text, done: false}
    ]
  }));
}

function removeTask(id) {
  store.setState(state => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== id)
  }));
}

function toggleTask(id) {
  store.setState(state => ({
    ...state,
    tasks: state.tasks.map(task =>  task.id === id ? {...task, done: !task.done} : task)
  }));
}
