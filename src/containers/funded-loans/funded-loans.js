import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMyFundedLoans } from '../../actions';
import LoanTableSmall from '../../components/loan-table-small/loan-table-small.js';

let destroyTimer = null;

let startTimer = (func) => {
  destroyTimer = setTimeout(() => {
    func();
    startTimer(func);
  }, 10000)
};

class FundedLoans extends Component {
  componentDidMount() {
    let { fetchMyFundedLoans } = this.props;
    fetchMyFundedLoans();
    startTimer(fetchMyFundedLoans);
  }

  componentWillUnmount() {
    destroyTimer && destroyTimer();
  }

  render() {

    let rows = this.props.myFundedLoans.map(loan => ({
      date: new Date(loan.issuanceBlockTime),
      principalAmount: loan.principalAmount.toNumber(),
      principalTokenSymbol: loan.principalTokenSymbol,
      termLength: loan.termLength.toNumber(),
      amortizationUnit: loan.amortizationUnit,
      interestRate: loan.interestRate,
      issuanceHash: loan.issuanceHash
    }));

    return (
      <LoanTableSmall header="My funded loans" dateColumnHeader="Date loan issued" rows={rows} />
    );
  }
}

let mapStateToProps = ({ myFundedLoans }) => ({
  myFundedLoans
});

let mapDispatchToProps = { fetchMyFundedLoans };

export default connect(mapStateToProps, mapDispatchToProps)(FundedLoans);