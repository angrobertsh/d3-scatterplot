import merge from "lodash/merge";

const defaultState = {};

const DataReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type){
    case "UPDATE_DATA":
      newState = merge(newState, action.data);
      return newState;
    default:
      return newState;
  }
}

export default DataReducer;
