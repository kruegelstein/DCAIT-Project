const actionTypes = {
  GetCarsRequested: 'GET_CARNAMES',
  GetCarsRejected: 'GET_CARNAMES_ERROR',
  GetCarsFulfilled: 'GET_CARNAMES_SUCCESS',
  GenerateSeries: 'GENERATE_SERIES',
  GenerateSeriesError: 'GENERATE_SERIES_ERROR',
  GenerateSeriesSuccess: 'GENERATE_SERIES_SUCCESS',
  SelectCar: 'SELECT_CAR',
  OpenModal: 'OPEN_MODAL',
  CloseModal: 'CLOSE_MODAL',
  SetCarsFilter: 'SET_CARS_FILTER',
  UnselectAllCars: 'UNSELECT_ALL_CARS',
  UnselectCar: 'UNSELECT_CAR',
  SelectColor: 'SELECT_COLOR',
  SelectGraph: 'SELECT_GRAPH',
  SelectAttribute: 'SELECT_ATTRIBUTE',
  UnselectAttribute: 'UNSELECT_ATTRIBUTE',
  SubmitOptions: 'SUBMIT_OPTIONS',
};

export default actionTypes;
