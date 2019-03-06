import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMyFundedLoans, setMyFundedLoansOffset } from '../../actions';
import LoanTableSmall from '../../components/loan-table-small/loan-table-small.js';
import Spinner from '../../components/spinner/spinner.js';
import Paging from '../../components/paging/paging.js';

const pageSize = 20;

let destroyTimer = null;
let startTimer = (func) => {
  destroyTimer = setTimeout(() => {
    func();
    startTimer(func);
  }, 10000)
};

class FundedLoans extends Component {
  constructor(props) {
    super(props);

    this.getFundedLoansForCurrentPage = this.getFundedLoansForCurrentPage.bind(this);
  }

  componentDidMount() {
    let { getFundedLoansForCurrentPage } = this;
    getFundedLoansForCurrentPage();
    startTimer(getFundedLoansForCurrentPage);
  }

  getFundedLoansForCurrentPage() {
    let { offset, fetchMyFundedLoans } = this.props;
    let currentPageNum = Math.floor(offset / pageSize);

    fetchMyFundedLoans(pageSize * currentPageNum, pageSize);
  }

  componentWillUnmount() {
    destroyTimer && destroyTimer();
  }

  render() {
    let { myFundedLoans, showPaging, isLoading, offset, totalItemsCount, setMyFundedLoansOffset, fetchMyFundedLoans } = this.props;

    let rows = myFundedLoans.map(loan => ({
      date: new Date(loan.issuanceBlockTime),
      principalAmount: loan.principalAmount.toNumber(),
      principalTokenSymbol: loan.principalTokenSymbol,
      termLength: loan.termLength.toNumber(),
      amortizationUnit: loan.amortizationUnit,
      interestRate: loan.interestRate,
      issuanceHash: loan.issuanceHash
    }));

    return (
      <LoanTableSmall
        header="My funded loans"
        dateColumnHeader="Date loan issued"
        rows={rows}
        isLoading={isLoading}
        showPaging={showPaging}
        offset={offset}
        totalItemsCount={totalItemsCount}
        pageSize={pageSize}
        onPageClick={(pageNum) => {
          setMyFundedLoansOffset(pageSize * pageNum);
          fetchMyFundedLoans(pageSize * pageNum, pageSize);
        }} />
    );
  }
}

let mapStateToProps = ({ myFundedLoans: { values, isLoading, offset, showPaging, totalItemsCount } }) => ({
  myFundedLoans: values,
  isLoading,
  offset,
  showPaging,
  totalItemsCount
});

let mapDispatchToProps = { fetchMyFundedLoans, setMyFundedLoansOffset };

export default connect(mapStateToProps, mapDispatchToProps)(FundedLoans);