import React from "react";
import * as d3 from "d3";

// <ScatterPlot key={xAxis + yAxis} xAxis={xAxis} yAxis={yAxis} data={data} />

class ScatterPlot extends React.Component{
  constructor(props){
    super(props);

    this.margin = {top: 20, right: 10, bottom: 40, left: 70},
    this.width = 1200 - this.margin.left - this.margin.right,
    this.height = 600 - this.margin.top - this.margin.bottom;

    this.d3Render = this.d3Render.bind(this);
    this.preprocessData = this.preprocessData.bind(this);
    this.generateSVG = this.generateSVG.bind(this);
    this.generateScales = this.generateScales.bind(this);
    this.labelAxes = this.labelAxes.bind(this);
    this.drawCircles = this.drawCircles.bind(this);
  }

  componentDidMount(){
    this.d3Render();
  }

  d3Render(){
    const preprocessedData = this.preprocessData();
    const svg = this.generateSVG();
    const { xScale, yScale } = this.generateScales(preprocessedData);

    this.labelAxes(svg, xScale, yScale);
    this.drawCircles(preprocessedData, svg, xScale, yScale);
  }

  preprocessData(){
    const { xAxis, yAxis, data } = this.props;

    const iterator = Object.keys(data);
    const dataArray = iterator.map(i => data[i]);
    const sanitizedData = dataArray.filter(datum => !isNaN(parseFloat(datum[xAxis])) && !isNaN(parseFloat(datum[yAxis])));

    return sanitizedData;

    // SAMPLE sanitizedData:
    // [{p. Mass: 23, p. Gravity: 235, otherField: "cat"}, {p. Mass: 1, p. Gravity: 2366, otherFIeld: "boo"}]
  }

  generateSVG(){
    const { margin, width, height } = this;

    const svg = d3.select("#main-scatterplot")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    return svg
  }

  generateScales(preprocessedData){
    const { width, height } = this;
    const { xAxis, yAxis } = this.props;

    const sortedXData = preprocessedData.map(datum => datum[xAxis]).sort((a, b) => a - b),
      sortedYData = preprocessedData.map(datum => datum[yAxis]).sort((a, b) => a - b);
    const xMax = sortedXData[sortedXData.length - 1],
      yMax = sortedYData[sortedYData.length - 1],
      xMin = sortedXData[0],
      yMin = sortedYData[0];

    const xScale = d3.scaleLinear()
      .domain([xMin, xMax])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([height, 0]);

    return { xScale: xScale, yScale: yScale }
  }

  labelAxes(svg, xScale, yScale){
    const { width, height } = this;
    const { xAxis, yAxis } = this.props;

    svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale).ticks(5));

    svg.append("text")
      .attr("transform", "translate(" + (width/2) + " ," + (height + 35) + ")")
      .style("text-anchor", "middle")
      .text(xAxis);

    svg.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(yScale).ticks(10));

    svg.append("text")
      .attr("transform", "rotate(-90) translate(" + (height/-2) + " , 0)")
      .attr("dy", "-2.9em")
      .text(yAxis);
  }

  drawCircles(preprocessedData, svg, xScale, yScale){
    const { xAxis, yAxis } = this.props;

    svg.selectAll("circle")
      .data(preprocessedData)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return xScale(d[xAxis]);
      })
      .attr("cy", function(d) {
        return yScale(d[yAxis]);
      })
      .attr("r", 2);
  }

  render(){
    return <svg id="main-scatterplot" className="scatterplot chart"></svg>
  }
}

export default ScatterPlot;
