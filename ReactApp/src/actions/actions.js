import ActionTypes from '../constants';
import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

export const setCarsFilter = (bool) => ({ type: ActionTypes.SetCarsFilter,  payload: bool })
export const closeModal = () => ({ type: ActionTypes.CloseModal, payload: { modal: false } });
export const openModal = (car, graphdata) => ({ type: ActionTypes.OpenModal, payload: { modal: true, car: car, graphdata: graphdata } });
export const selectCar = (car) => ({ type: ActionTypes.SelectCar, payload: { car } });
export const unselectCar = (car, carName) => ({ type: ActionTypes.UnselectCar, payload: { car, name: carName } });
export const unselectAllCars = () => ({ type: ActionTypes.UnselectAllCars, payload: { } })
export const selectGraph = (attribute, graph) => ({ type: ActionTypes.SelectGraph, payload: { attribute, value: graph }})
export const selectColor = (attribute, color) => ({ type: ActionTypes.SelectColor, payload: { attribute, value: color }})
export const selectAttribute = (attribute, bool) => ({ type: ActionTypes.SelectAttribute, payload: { attribute, value: true }})
export const unselectAttribute = (attribute, bool) => ({ type: ActionTypes.UnselectAttribute, payload: { attribute, value: false }})
export const submitOptions = (form, car) => ({ type: ActionTypes.SubmitOptions, payload: { form, car }})

//Export to Mongo actions
export function loadCarsInMongo(name, timestamps) {
  // load in collection cars
  // type: 'loadCarsInMongo',
  // payload: {id, name}
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, {name, timestamps})
  }

}

export const getCars = (callback = null) => ((dispatch) => {
  dispatch(getCarsRequestedAction());
  return axios.get(`${ROOT_URL}/getCarNames`)
    .then(
      (r) => {
        if (callback) { callback(true, r); }
        dispatch(getCarsFulfilledAction(r));
      },
      (e) => {
        if (callback) { callback(false, e); }
        dispatch(getCarsRejectedAction(e));
      }
    );
});

export const buildSeries = (carName, form, callback = null) => ((dispatch) => {
  dispatch(generateSeries(carName, form));
  return axios.post(`${ROOT_URL}/getCarData`, {carName, form})
    .then(
      (r) => {
        if (callback) { callback(true, r); }
        dispatch(generateSeriesSuccess(r));
      },
      (e) => {
        if (callback) { callback(false, e); }
        dispatch(generateSeriesError(e));
      }
    );
});

function generateSeriesSuccess(r) {
  return {
    type: ActionTypes.GenerateSeriesSuccess,
    payload: r
  }
}

function generateSeries(car, form) {
  return {
    type: ActionTypes.GenerateSeries,
    resource: {car, form}
  };
}

function generateSeriesError(error) {
  return {
    type: ActionTypes.GenerateSeriesError,
    payload: error,
  }
}

function getCarsRequestedAction() {
  return {
    type: ActionTypes.GetCarsRequested
  };
}

function getCarsRejectedAction(error) {
  return {
    type: ActionTypes.GetCarsRejected,
    payload: error
  }
}

function getCarsFulfilledAction(car) {
  return {
    type: ActionTypes.GetCarsFulfilled,
    data: car
  };
}
