import React, { Component } from "react";
import Scatter from "./3d-scatter-plot";
import * as d3 from "d3";
import "./Chart.css";

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], loading: true, scales: null };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const loadData = true;
    if (loadData) {
      const data = require("./data3d.json");
      var xMax = d3.max(data, function(d) {
        return d.xValue;
      });
      var xMin = d3.min(data, function(d) {
        return d.xValue;
      });
      var yMax = d3.max(data, function(d) {
        return d.xValue;
      });
      var yMin = d3.min(data, function(d) {
        return d.xValue;
      });
      var zMax = d3.max(data, function(d) {
        return d.xValue;
      });
      var zMin = d3.min(data, function(d) {
        return d.xValue;
      });
      var hrMax = d3.max(data, function(d) {
        return d.R;
      });
      var hrMin = d3.min(data, function(d) {
        return d.R;
      });
      var hrMean = d3.mean(data, function(d) {
        return d.R;
      });
      const xScale = d3
        .scaleLinear()
        .domain([xMin, xMax])
        .range([-300, 300]);
      const yScale = d3
        .scaleLinear()
        .domain([yMin, yMax])
        .range([-140, 140]);
      const zScale = d3
        .scaleLinear()
        .domain([zMin, zMax])
        .range([-140, 140]);
      const cScale = d3
        .scaleLinear()
        .domain([hrMin, hrMax])
        .interpolate(d3.interpolateHcl)
        .range([d3.rgb("#4834d4"), d3.rgb("#BDFF00")]);
      const rScale = d3
        .scaleLinear()
        .domain([75, 180])
        .range([1, 13]);

      this.setState({
        data: data,
        scales: { xScale, yScale, zScale, cScale, rScale }
      });
      setTimeout(() => this.setState({ loading: false }), 1500);
    }
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return (
        <div className="chartTitle">
          <h2>Loading...</h2>
        </div>
      );
    }

    return (
      <div>
        <h2 className="chartTitle">3D Scatter Plot</h2>
        <Scatter data={this.state.data} scale={this.state.scales} />
        <div>
          Flamingos{" "}
          <a
            href="https://www.freepik.com/?__hstc=57440181.9b1c6d182888bcb40813763651c94975.1557075468580.1557075468580.1557075468580.1&__hssc=57440181.3.1557075468581&__hsfp=3229653487"
            title="Freepik"
          >
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>{" "}
          is licensed by{" "}
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
            target="_blank"
          >
            CC 3.0 BY
          </a>
        </div>
      </div>
    );
  }
}
