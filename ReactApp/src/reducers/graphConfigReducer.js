import ActionTypes from '../constants';

// reducer for the general graph config

// build initial state
const initial = {
  chart: {
      renderTo: 'graph',
      type: 'line',
      zoomType: 'x',
      panning: true,
      panKey: 'shift',
      height: 800
  },
  title: {
      text: 'Graphs'
  },
  xAxis: {
      max: null,
  },
  yAxis: {
      title: {
          text: 'Value',
          max: null,
      }
  },
}

function graphConfig(
  state = { ...initial } , action = {}) {
    switch(action.type) {
      default:
        return state
    }
}

export default graphConfig;
