import { combineReducers } from "redux";
import DataReducer from "./data_reducer";
import FilterReducer from "./filter_reducer";

const RootReducer = combineReducers({
  data: DataReducer,
  filters: FilterReducer
});

export default RootReducer;
