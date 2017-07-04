import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Button, Radio, FormGroup, DropdownButton, MenuItem } from 'react-bootstrap';

import {
  closeModal, selectGraph,
  selectColor, selectAttribute,
  unselectAttribute, submitOptions,
  selectCar, unselectCar } from '../actions/actions.js'
import CarList from './CarList';
import Graph from './Graph';

class App extends Component {
  showModal() {
    return (
      <Modal
        isOpen={this.props.modal}
        contentLabel="Modal"
        id="modal"
        >
        <div className="editModal">
          {this.showModalHeader()}
          {this.showModalContent()}
          {this.showModalFooter()}
        </div>
      </Modal>
    )
  }

  showModalHeader() {
    return (
      <div className="modalHeader">
        <h4> {this.props.carName} </h4>
        <a

          onClick={() => this.props.onCloseModal(this.props.selectedCar)}
          className="modalClose"
        >
          <p>X</p>
        </a>
      </div>
    )
  }

  showModalContent() {
    return (
      <div className="modalContent">
        <div>
          <p>Select attributes to render in graph</p>
          {this.showAttributes()}
        </div>
      </div>
    )
  }

  checked(a) {
    if(this.props.attributeIsSelected.includes(a)){
      return true
    } else {
      return false
    }
  }

  color(a) {
    let attrPos = this.props.attributes.indexOf(a)
    return this.props.attributesInForm[attrPos].color
  }

  graph(a) {
    let attrPos = this.props.attributes.indexOf(a)
    return this.props.attributesInForm[attrPos].graph
  }

  showAttributes() {
    return (
      <div className="attributesList">
        <form className="attributesForm">
        {this.props.attributes.map(a => {
          return (
            <li className="attributes">
              <FormGroup className="checkbox" controlId="checked">
                <Radio
                  checked={this.checked(a)}
                  onChange= {() => {
                    if(!this.checked(a)) {
                      this.props.onSelectAttribute(a, true)
                    } else {
                      this.props.onUnSelectAttribute(a, false)
                    }
                  }
                  }
                >{a}</Radio>
              </FormGroup>
              <FormGroup className="graph" controlId="graph">
                <DropdownButton className="graphDd" title={this.graph(a)}>
                {this.props.graphs.map(g => {
                  return (
                    <MenuItem
                      eventKey="1"
                      onSelect={() => this.props.onSelectGraphType(a, g)}
                    >{g}</MenuItem>
                  )
                })
                }
                </DropdownButton>
              </FormGroup>
              <FormGroup className="color" controlId="color">
                <DropdownButton className="colorDd" title={this.color(a)}>
                {this.props.colors.map(c => {
                  return (
                    <MenuItem
                      eventKey="1"
                      onSelect={() => this.props.onSelectColorType(a, c)}
                    >{c}</MenuItem>
                  )
                })
                }
                </DropdownButton>
              </FormGroup>
            </li>
          )
        })
        }
        </form>
      </div>
    )
  }

  showModalFooter() {
    return (
      <div className="modalFooter">
        <Button
          bsStyle="success"
          onClick={() => this.props.onSubmitOptions(this.props.form, this.props.carName)}
        >
          Submit
        </Button>
        <Button
          bsStyle="danger"
          onClick={() => this.props.onCloseModal(this.props.selectedCar, this.props.graphdata)}
        >
          Cancel
        </Button>
      </div>
    )
  }

  render() {
    return (
      <div className="app">
        <h2>Simulation of Vehicle-2-X Communication</h2>
        <CarList />
        {this.showModal()}
        <Graph />
      </div>
    )
  }
}

App.propTypes = {
  modal: PropTypes.bool.isRequired,
  carName: PropTypes.string.isRequired,
  selectedCar: PropTypes.number,
}

const mapStateToProps = (state, _ownProps) => {
  let attributes = state.form.general.attributes
  let selectedCar = state.navigation.selected.car
  let carName = ''
  if(selectedCar !== null) {
    carName = state.cars[selectedCar].name
  }
  let selAttributes = Object.keys(state.form.selected).map(a =>  state.form.selected[a].selected === true)
  let attributeIsSelected = []
  selAttributes.forEach((value, index) => {
    if(value) {
      attributeIsSelected.push(state.form.general.attributes[index])
    }
  })
  let attributesInForm =  state.form.selected
  return {
    form: state.form.selected,
    attributesInForm,
    attributeIsSelected,
    selAttributes,
    attributes,
    colors: state.form.general.colors,
    graphs: state.form.general.graphs,
    selectedCar,
    carName,
    modal: state.navigation.modal,
    graphdata: state.graphdata,
  };
};

const mapDispatchToProps = (dispatch, _ownProps) => ({
  onSubmitOptions: (form, carName) => {
    dispatch(submitOptions(form, carName))
    dispatch(closeModal())
  },
  onCloseModal: (car, graphdata) => {
    if(Object.keys(graphdata).map(a => graphdata[a].carId).includes(car)) {
      dispatch(closeModal());
    } else {
      dispatch(closeModal());
      dispatch(unselectCar(car))
    }
  },
  onSelectColorType: (attribute, color) => {
    dispatch(selectColor(attribute, color))
  },
  onSelectGraphType: (attribute, graph) => {
    dispatch(selectGraph(attribute, graph))
  },
  onSelectAttribute: (attribute, bool) => {
    dispatch(selectAttribute(attribute, bool))
  },
  onUnSelectAttribute: (attribute, bool) => {
    dispatch(unselectAttribute(attribute, bool))
  }
});

App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default App;
