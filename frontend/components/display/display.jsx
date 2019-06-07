import React from "react";
import Selector from "../selector/selector";
import ScatterPlot from "../charts/scatterplot/scatterplot";

class Display extends React.Component{
  constructor(props){
    super(props);
    this.props.getSeedData();
  }

  render() {
    const { data, xAxis, yAxis, updateAxis } = this.props;

    return (
      <div>
        <div className="flex column">
          <div className="flex w-100vw gray-border-bottom">
            <header className="padding-10 rem-2-font">Exoplanet Data Explorer</header>
          </div>
          <div className="flex">
            <Selector key={xAxis} updateAxis={updateAxis} axisValue={xAxis} axisName={"x"} data={data} />
            <Selector key={yAxis} updateAxis={updateAxis} axisValue={yAxis} axisName={"y"} data={data} />
          </div>
          <div className="padding-10">
            <span className="rem-three-halves-font">{xAxis} vs. {yAxis}</span>
          </div>
          { data && Object.keys(data).length > 0 &&
            <ScatterPlot key={xAxis + yAxis} xAxis={xAxis} yAxis={yAxis} data={data} />}
        </div>
      </div>
    )
  }
}

export default Display;
