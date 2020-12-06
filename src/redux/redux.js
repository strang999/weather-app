import React from "react";
import { createStore } from "redux";
const reducer = (state = 0, action) => {
  switch (action.type) {
    case "INC":
      return state + 1;
    default:
      return state;
  }
};

const store = createStore(reducer);
const inc = () => ({
  type: "INC",
});
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(inc());
store.dispatch({ type: "INC" });

// let state = reducer(undefined, {});
// state = reducer(state, { type: "INC" });
// state = reducer(state, { type: "INC" });

const redux = () => {
  return <div></div>;
};

export default redux;
