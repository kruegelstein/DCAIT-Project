import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js'
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts'
import GraphTest from '../scripts/Graph_Test'

class Graph extends Component {

  render() {
    return (
      <div className="graph col-sm-12 col-md-9 col-lg-9">
        <ReactHighcharts config={this.props.config}></ReactHighcharts>
      </div>
    )
  }
}

const mapStateToProps = (state, _ownProps) => {
  // Build config
  let config = {}

  // get general graph config from state.graphConfig
  let chart = state.graphConfig.chart
  let title = state.graphConfig.title
  let xAxis = state.graphConfig.xAxis
  let yAxis = state.graphConfig.yAxis
  config['chart'] = chart
  config['title'] = title
  config['xAxis'] = xAxis
  config['yAxis'] = yAxis

  // get series data
  let series = state.series.series
  config['series'] = series


  return {
    config,
  };
};

Graph = connect(
  mapStateToProps,
  null,
)(Graph);

export default Graph;
