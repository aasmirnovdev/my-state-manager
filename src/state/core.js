// src/state/core.js

export function createStore(initialState) {
  // внутреннее место, где реально лежат данные
  let state = initialState;

  // список подписчиков
  const listeners = [];

  // список миддлваров
  const middlewares = [];

  return {
    getState() {
      return state; // просто возвращаем текущее значение
    },

    setState(updater) {
      // updater может быть значением или функцией
      let nextState =
        typeof updater === 'function'
          ? updater(state)
          : updater;

           // пропускаем через middleware
      middlewares.forEach(mw => {
        nextState = mw(state, nextState);
      });

      if (nextState === undefined) {
        throw new Error('State cannot be undefined');
      }

      if (nextState === state) {
        return; // нечего обновлять
      }

      state = nextState; // сохраняем новое состояние

      // уведомляем подписчиков
      const snapshot = listeners.slice(); // не изменяем массив подписчиков во время обхода
      snapshot.forEach(fn => fn(state));
    },

    subscribe(listener) {
      listeners.push(listener);

      // вернуть отписку
      return () => {
        const index = listeners.indexOf(listener);
        if (index >= 0) listeners.splice(index, 1);
      };
    },

    // регистрация middleware
    use(mw) {
      middlewares.push(mw);
    }
  };
}
