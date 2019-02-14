import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMyOutstandingLoans } from '../../actions';
import LoanTableSmall from '../../components/loan-table-small/loan-table-small.js';

let destroyTimer = null;

let startTimer = (func) => {
  destroyTimer = setTimeout(() => {
    func();
    startTimer(func);
  }, 10000)
};

class OutstandingLoans extends Component {

  componentDidMount() {
    let { fetchMyOutstandingLoans } = this.props;
    fetchMyOutstandingLoans();
    startTimer(fetchMyOutstandingLoans);
  }

  componentWillUnmount() {
    destroyTimer && destroyTimer();
  }

  render() {
    let rows = this.props.myOutstandingLoans.map(loan => ({
      date: new Date(loan.issuanceBlockTime),
      principalAmount: loan.principalAmount.toNumber(),
      principalTokenSymbol: loan.principalTokenSymbol,
      termLength: loan.termLength.toNumber(),
      amortizationUnit: loan.amortizationUnit,
      interestRate: loan.interestRate,
      issuanceHash: loan.issuanceHash
    }));

    return (
      <LoanTableSmall header="My outstading loans" dateColumnHeader="Date loan issued" rows={rows} />
    );
  }
}

let mapStateToProps = ({ myOutstandingLoans }) => ({
  myOutstandingLoans
});

let mapDispatchToProps = { fetchMyOutstandingLoans };

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingLoans);