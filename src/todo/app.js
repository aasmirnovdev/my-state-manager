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

store.subscribe(render);

function render(state) {
  taskList.innerHTML = '';

  if (state.tasks.length === 0) {
    taskList.innerHTML = '<li class="empty">Список пуст</li>';
    return;
  }

  state.tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.style.textDecoration = task.done ? 'line-through' : 'none';

    li.addEventListener('click', () => toggleTask(task.id));

    const del = document.createElement('button');
    del.textContent = 'x';

    del.addEventListener('click', (e) => {
      e.stopPropagation();
      removeTask(task.id);
    });

    li.appendChild(del);
    taskList.appendChild(li);
  })
}

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
