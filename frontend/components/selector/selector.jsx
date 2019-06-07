import React from 'react';
import { NUMBER_COLUMNS } from "../../utils/file_constants";
import BarChart from "../charts/barchart/barchart";

// <Selector key={xAxis} updateAxis={updateAxis} axisValue={xAxis} axisName={"x"} data={data} />

class Selector extends React.Component{
  constructor(props){
    super(props);
    this.renderSelect = this.renderSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  renderSelect(){
    const { axisValue } = this.props;
    return (
      <select className="margin-10" onChange={this.handleChange} value={axisValue}>
        { NUMBER_COLUMNS.map((columnName) => (
          <option key={columnName} value={columnName}>{columnName}</option>
        )) }
      </select>
    )
  }

  handleChange(e){
    const { updateAxis, axisName } = this.props;
    updateAxis(axisName, e.target.value);
  }

  render() {
    const { data, axisValue, axisName } = this.props;
    return (
      <div className="flex column">
        <div className="rem-three-halves-font padding-10">
          { axisName &&
            axisName.toUpperCase() + "-Axis" }
        </div>
        { this.renderSelect() }
        { data && Object.keys(data).length > 0 &&
          <BarChart key={axisValue} data={Object.keys(data).map(dataKey => data[dataKey][axisValue])} chartLabel={axisValue} axisName={axisName}/> }
      </div>
    )
  }
}

export default Selector;
