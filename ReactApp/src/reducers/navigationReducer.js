import { combineReducers } from 'redux';


const initial = {
  cars: [],
  car: null,
};

function modal(state = null, action) {
  return { ...state }
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
      case 'DELETE_SELECTED_CAR':
        return {
          ...state,
          cars: state.cars.filter(c => c !== action.payload.car)
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
