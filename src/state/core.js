// src/state/core.js

export function createStore(initialState) {
  // внутреннее место, где реально лежат данные
  let state = initialState;

  // список подписчиков
  const listeners = [];

  return {
    getState() {
      return state; // просто возвращаем текущее значение
    },

    setState(updater) {
      // updater может быть значением или функцией
      const nextState =
        typeof updater === 'function'
          ? updater(state)
          : updater;

      state = nextState; // сохраняем новое состояние

      // уведомляем подписчиков
      listeners.forEach(fn => fn(state));
    },

    subscribe(listener) {
      listeners.push(listener);

      // вернуть отписку
      return () => {
        const index = listeners.indexOf(listener);
        if (index >= 0) listeners.splice(index, 1);
      };
    }
  };
}
