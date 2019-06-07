import { connect } from "react-redux";
import Display from "./display";
import { getSeedData } from "../../actions/data_actions";
import { updateAxis } from "../../actions/filter_actions";

const mapStateToProps = state => ({
  data: state.data,
  xAxis: state.filters.xAxis,
  yAxis: state.filters.yAxis,
});

const mapDispatchToProps = dispatch => ({
  getSeedData: () => dispatch(getSeedData()),
  updateAxis: (whichAxis, axisValue) => dispatch(updateAxis(whichAxis, axisValue)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Display);
