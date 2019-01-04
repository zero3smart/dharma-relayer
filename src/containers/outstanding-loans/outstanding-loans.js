import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchFilledDebts} from '../../actions';
import LoanTableSmall from '../../components/loan-table-small/loan-table-small.js';

let destroyTimer = null;

let startTimer = (func) => {
  destroyTimer = setTimeout(() => {
    func();
    startTimer(func);
  }, 10000)
};

class OutstandingLoans extends Component{

  componentDidMount(){
    let {fetchFilledDebts} = this.props;
    fetchFilledDebts();
    startTimer(fetchFilledDebts);
  }

  componentWillUnmount(){
    destroyTimer && destroyTimer();
  }

  render(){
    let {filledDebts} = this.props;
    return (
      <LoanTableSmall header="My outstading loans" rows={filledDebts}/>
    );
  }
}

let mapStateToProps = ({filledDebts}) => ({
  filledDebts
});

let mapDispatchToProps = {fetchFilledDebts};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingLoans);