import { normalizeCars } from '../schema';
import { getValue, mapObject, filterObject } from '../helper/helper';
import ActionTypes from '../constants';


const cars = (state = {}, action = {}) => {
  switch (action.type) {
  //initialy loading the cars --> load only ids, names and selected-flag
  case ActionTypes.GetCarsFulfilled: {
    return {
      ...state,
      ...action.data.data.map((d, index) => {
        return { id: index, name: d.name, selected: 0}
      }),
    }
  }
  // After being selected get --> Get the timestamps data for the given car
  case ActionTypes.getCarsDataFullfilled: {
    console.log('car', action.payload.timestamps.data[0].name);
    return {
      ...state,
      ...Object.keys(state).map(c => {
        if(state[c].name === action.payload.timestamps.data[0].name){
          return { ...state[c], timestamps: action.payload.timestamps.data[0].timestamps }
        } else {
          return state[c]
        }
      })
    }
  }
  // When selecting a car --> change the selected-flag to 1
  case ActionTypes.SelectCar: {
    return {
      ...state,
      ...Object.keys(state).map(c => {
        if(state[c].id === action.payload.car) {
          return { ...state[c], selected: 1 }
        } else {
          return state[c]
        }
      })
    }
  }
  // When unselecting a car --> change the selected flag to 0 and remove timestamps
  case ActionTypes.UnselectCar: {
    return {
      ...state,
      ...Object.keys(state).map(c => {
        if(state[c].id === action.payload.car){
          delete state[c]['timestamps']
          return { ...state[c], selected: 0 }
        } else {
          return state[c]
        }
      })
    }
  }
  // When unselecting all cars --> change the selected-flag to 0 for all cars and remove all the timestamps
  case ActionTypes.UnselectAllCars: {
    return {
      ...state,
      ...Object.keys(state).map(c => {
        if(state[c].selected === 1) {
          delete state[c]['timestamps']
          return { ...state[c], selected: 0 }
        } else {
          return state[c]
        }
      })
    }
  }

  default:
      return { ...state }
  }
}

export default cars;
