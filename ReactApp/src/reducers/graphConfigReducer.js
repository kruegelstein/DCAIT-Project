import ActionTypes from '../constants';


const initial = {
  chart: {
      renderTo: 'graph',
      type: 'line',
      zoomType: 'x',
      panning: true,
      panKey: 'shift'
  },
  title: {
      text: 'Graphs'
  },
  xAxis: {
      //needs to get the timestamps
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
