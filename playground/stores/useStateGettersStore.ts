export const useStateGettersStore = createStore(
  "state-getters",
  ({ state, getter }) => {
    const count = state(0, { persist: true });
    const double = getter(() => count.value * 2);

    const increment = () => {
      count.value++;
    };

    return {
      count,
      increment,
      double,
    };
  }
);
