import merge from "lodash/merge";
import { X_AXIS_DEFAULT, Y_AXIS_DEFAULT } from "../utils/file_constants";

const defaultState = {
  xAxis: X_AXIS_DEFAULT,
  yAxis: Y_AXIS_DEFAULT,
};

const FilterReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type){
    case "UPDATE_AXIS":
      newState = merge(newState, {[action.whichAxis + "Axis"]: action.axisValue});
      return newState;
    default:
      return newState;
  }
}

export default FilterReducer;
