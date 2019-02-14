import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMyOpenedLoanRequests} from '../../actions';
import LoanTableSmall from '../../components/loan-table-small/loan-table-small.js';

let destroyTimer = null;

let startTimer = (func) => {
  destroyTimer = setTimeout(() => {
    func();
    startTimer(func);
  }, 10000)
};

class OpenLoanRequests extends Component{
  componentDidMount(){
    let {fetchMyOpenedLoanRequests} = this.props;
    fetchMyOpenedLoanRequests();
    startTimer(fetchMyOpenedLoanRequests);
  }

  componentWillUnmount(){
    destroyTimer && destroyTimer();
  }

  render(){
    let {myOpenLoanRequests} = this.props;

    return (
      <LoanTableSmall header="My open loan requests" rows={myOpenLoanRequests}/>
    );
  }
}

let mapStateToProps = ({myOpenLoanRequests}) => ({
  myOpenLoanRequests
});

let mapDispatchToProps = {fetchMyOpenedLoanRequests};

export default connect(mapStateToProps, mapDispatchToProps)(OpenLoanRequests);