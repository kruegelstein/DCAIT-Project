import { combineReducers } from 'redux';


const initial = {
  cars: [],
  car: null,
  filterSelected: false,
};

function modal(state = false, action) {
  switch(action.type) {
    case 'OPEN_MODAL':
      return action.payload.data
    case 'CLOSE_MODAL':
      return action.payload.data
    default:
      return state
  }
}

function selected(
  state = { ...initial } , action = {}) {
    switch(action.type) {
      case 'SELECT_CAR':
        return {
          ...state,
          car: action.payload.car
        }
      case 'SELECT_CAR_FROM_LIST':
        return {
          ...state,
          cars: action.payload.car
        }
      case 'UNSELECT_CAR':
        return {
          ...state,
          cars: state.cars.filter(c => c !== action.payload.car)
        }
      case 'UNSELECT_ALL_CARS':
        return {
          ...state,
          cars: []
        }
      case 'SET_CARS_FILTER':
        return {
          ...state,
          filterSelected: action.payload
        }
      default:
        return state
    }
}

const navigation = combineReducers({
  selected,
  modal,
});

export default navigation;