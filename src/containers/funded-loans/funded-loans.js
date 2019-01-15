import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMyFundedLoans} from '../../actions';
import LoanTableSmall from '../../components/loan-table-small/loan-table-small.js';

let destroyTimer = null;

let startTimer = (func) => {
  destroyTimer = setTimeout(() => {
    func();
    startTimer(func);
  }, 10000)
};

class FundedLoans extends Component{
  componentDidMount(){
    let {fetchMyFundedLoans} = this.props;
    fetchMyFundedLoans();
    startTimer(fetchMyFundedLoans);
  }

  componentWillUnmount(){
    destroyTimer && destroyTimer();
  }

  render(){
    let {myFundedLoans} = this.props;
    return (
      <LoanTableSmall header="My funded loans" rows={myFundedLoans}/>
    );
  }
}

let mapStateToProps = ({myFundedLoans}) => ({
  myFundedLoans
});

let mapDispatchToProps = {fetchMyFundedLoans};

export default connect(mapStateToProps, mapDispatchToProps)(FundedLoans);