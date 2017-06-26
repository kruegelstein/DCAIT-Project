import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import {
  getCars, setCarsFilter,
  unselectCar, unselectAllCars,
  selectCar, openModal,
  filterSelected, loadAdditionalData } from '../actions/actions.js'
import CarListItem from './CarListItem';

class CarList extends Component {
  componentDidMount() {
    this.props.loadCarsFromDB();
  }

  renderSelection() {
    return (
      <div className="aboveList">
        <a
          onClick={() => this.props.onSetCarsFilter(false)}
        >
          <p>All ({this.props.numOfAllCars})</p>
        </a>
        <a
          onClick={() => this.props.onSetCarsFilter(true)}
        >
          <p>Selected ({this.props.numOfSelCars})</p>
        </a>
      </div>
    )
  }

  render() {
    return (
      <div className="col-sm-12 col-md-2 col-lg-2">
        {this.renderSelection()}
        <div className="carList">
          <div className="listHeader">
            <a className={`reset ${!this.props.filterSelected ? 'hidden' : ''}`} onClick={() => this.props.onUnselectAllCars()}>
              Reset
            </a>
              <span className="header">{this.props.headerText}</span>
          </div>
          <div className="carItemContainer">
            { this.props.viewedCars.map((car) => {
                return (
                  <CarListItem
                    key={car.id}
                    index={car.id}
                    name={car.name}
                    onEdit={() => this.props.onOpenModal(car.id, this.props.graphdata)}
                    onUnselect={() => this.props.onUnselectCar(car.id)}
                    onClick={() => this.props.onSelectCar(car.id, this.props.graphdata)}
                    filterSelected={this.props.filterSelected}
                    isSelected={Object.keys(this.props.cars).map(a => {
                      if(this.props.cars[a].selected === 1) {
                        return this.props.cars[a].id
                      } else {
                        return -1
                      }
                    }).includes(car.id)}
                    />
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

CarList.propTypes = {
  loadCarsFromDB: PropTypes.func.isRequired,
  onSetCarsFilter: PropTypes.func.isRequired,
  onUnselectCar: PropTypes.func.isRequired,
  onUnselectAllCars: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
}

const mapStateToProps = (state, _ownProps) => {
  // Helpers
  let cars = state.cars;
  let viewedCars = [];
  let headerText = "Cars";

  // Choose which cars are being displayed
  if(!state.navigation.selected.filterSelected) {
    const carIds = Object.keys(cars)
    viewedCars = carIds.map(cId => cars[cId]);
  } else {
    const carIds = Object.keys(cars).filter(c => cars[c].selected === 1) || [];
    viewedCars = carIds.map(cId => cars[cId]);
    headerText = "Selected Cars";
  }

  // Calculate the numbers of all cars and the number of selected cars
  const numOfAllCars = Object.keys(cars).length
  const numOfSelCars = Object.keys(cars).filter(a => cars[a].selected === 1).length

  // Show the correct form values
  // If selected car has form values in graphdata show those else show default values
  // let form = state.form.selected
  // console.log('1', form);
  // console.log(Object.keys(state.graphdata).map(a => Number(a)));
  // console.log(state.navigation.selected.car);
  // if(Object.keys(state.graphdata)
  //     .map(a => Number(a))
  //     .includes(state.navigation.selected.car)) {
  //   form = state.graphdata[state.navigation.selected.car].settings
  //   console.log('2', form)
  // }
  // console.log('3', form)
  return {
    // form,
    graphdata: state.graphdata,
    cars,
    headerText,
    viewedCars,
    filterSelected: state.navigation.selected.filterSelected,
    numOfAllCars,
    numOfSelCars,
  };
};

const mapDispatchToProps = (dispatch, _ownProps) => ({
  loadCarsFromDB: () => {
    dispatch(getCars());
  },
  onSelectCar: (car, graphdata) => {
    dispatch(selectCar(car))
    dispatch(openModal(car, graphdata))
  },
  onSetCarsFilter: (bool) => {
    dispatch(setCarsFilter(bool));
  },
  onOpenModal: (car, graphdata) => {
    dispatch(selectCar(car))
    dispatch(openModal(car, graphdata))

  },
  onUnselectCar: (car) => {
    dispatch(unselectCar(car));
  },
  onUnselectAllCars: () => {
    dispatch(unselectAllCars())
  }
});

CarList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarList);

export default CarList;
