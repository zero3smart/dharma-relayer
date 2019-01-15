import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMyOutstandingLoans} from '../../actions';
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
    let {fetchMyOutstandingLoans} = this.props;
    fetchMyOutstandingLoans();
    startTimer(fetchMyOutstandingLoans);
  }

  componentWillUnmount(){
    destroyTimer && destroyTimer();
  }

  render(){
    let {myOutstandingLoans} = this.props;
    return (
      <LoanTableSmall header="My outstading loans" rows={myOutstandingLoans}/>
    );
  }
}

let mapStateToProps = ({myOutstandingLoans}) => ({
  myOutstandingLoans
});

let mapDispatchToProps = {fetchMyOutstandingLoans};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingLoans);