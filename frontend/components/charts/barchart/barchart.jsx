import React from "react";
import * as d3 from "d3";

// <BarChart key={axisValue} data={Object.keys(data).map(dataKey => data[dataKey][axisValue])} chartLabel={axisValue} axisName={axisName}/>

class BarChart extends React.Component{
  constructor(props){
    super(props);

    this.margin = {top: 20, right: 10, bottom: 40, left: 10},
    this.width = 600 - this.margin.left - this.margin.right,
    this.height = 200 - this.margin.top - this.margin.bottom;

    this.d3Render = this.d3Render.bind(this);
    this.preprocessData = this.preprocessData.bind(this);
    this.generateSVG = this.generateSVG.bind(this);
    this.generateScales = this.generateScales.bind(this);
    this.labelAxes = this.labelAxes.bind(this);
    this.drawBars = this.drawBars.bind(this);
    this.drawBar = this.drawBar.bind(this);
  }

  componentDidMount(){
    this.d3Render();
  }

  d3Render(){
    const { labels, data, xScale, yScale } = this.preprocessData();
    const svg = this.generateSVG();

    this.labelAxes(svg, xScale, yScale);
    this.drawBars(labels, data, svg, xScale, yScale);
  }

  preprocessData(){
    const { data } = this.props;

    let dataObject = {};

    const sanitizedData = data.filter(datum => !isNaN(parseFloat(datum)));
    const sortedData = sanitizedData.sort((a, b) => a - b);
    const dataMax = sortedData[sortedData.length - 1],
      dataMin = sortedData[0];

    const numBins = 15;
    const formattedData = {};
    const labels = [];

    const binSize = (dataMax - dataMin) / numBins;
    let rangeMin, rangeMax, label;
    let yMax = 0;

    let dataIterator = 0;
    for(let i = 0; i < numBins; i++){
      rangeMin = dataMin + (binSize * i);
      rangeMax = dataMin + (binSize * (i + 1));
      label = parseInt(rangeMin).toString() + " - " + parseInt(rangeMax).toString();
      labels.push(label);
      formattedData[label] = 0;
      while(sortedData[dataIterator] <= rangeMax){
        formattedData[label]++;
        dataIterator++;
        if(formattedData[label] > yMax){
          yMax = formattedData[label];
        }
      }
    }

    const { xScale, yScale } = this.generateScales(dataMin, dataMax, 0, yMax, labels);

    dataObject = {
      labels: labels,
      data: formattedData,
      xScale: xScale,
      yScale: yScale,
    }

    // SAMPLE formattedData: {"1 - 23": 2, "23 - 46": 5}
    // SAMPLE labels: ["1 - 23", "23 - 46"]

    return dataObject;
  }

  generateSVG(){
    const { margin, width, height } = this;
    const { axisName } = this.props;

    let elName = "#barchart_" + axisName;

    const svg = d3.select(elName)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    return svg
  }

  generateScales(xMin, xMax, yMin, yMax, labels){
    const { width, height } = this;

    const xScale = d3.scaleBand()
      .padding(0.1)
      .domain(labels)
      .rangeRound([0, width]);

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
  }

  drawBars(labels, preprocessedData, svg, xScale, yScale){
    const { xAxis, yAxis, axisName } = this.props;

    labels.forEach((label, idx) => this.drawBar(label, [preprocessedData[label]], svg, xScale, yScale, (axisName + "_" + idx.toString())));
  }

  drawBar(label, data, svg, xScale, yScale, classLabel){
    const { height } = this;

    const bars = svg.selectAll("." + classLabel)
      .data(data)
    .enter().append("rect")
      .attr("class", (d) => ("bar " + classLabel))
      .attr("x", (d) => (xScale(label)))
      .attr("y", (d) => (yScale(d)))
      .attr("width", (d) => (xScale.bandwidth()))
      .attr("height", (d) => (height - yScale(d)));
  }

  render(){
    const { axisName } = this.props;
    return <svg id={("barchart_" + axisName)} className="barchart chart"></svg>
  }
}

export default BarChart;
