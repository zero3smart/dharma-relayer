import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMyOpenedLoanRequests, setMyOpenedLoanRequestsOffset } from '../../actions';
import LoanTableSmall from '../../components/loan-table-small/loan-table-small.js';

const pageSize = 20;

let destroyTimer = null;
let startTimer = (func) => {
  destroyTimer = setTimeout(() => {
    func();
    startTimer(func);
  }, 10000)
};

class OpenLoanRequests extends Component {
  constructor(props) {
    super(props);

    this.getOpenLoansForCurrentPage = this.getOpenLoansForCurrentPage.bind(this);
  }

  componentDidMount() {
    let { getOpenLoansForCurrentPage } = this;
    getOpenLoansForCurrentPage();
    startTimer(getOpenLoansForCurrentPage);
  }

  componentWillUnmount() {
    destroyTimer && destroyTimer();
  }

  getOpenLoansForCurrentPage() {
    let { offset, fetchMyOpenedLoanRequests } = this.props;
    let currentPageNum = Math.floor(offset / pageSize);

    fetchMyOpenedLoanRequests(pageSize * currentPageNum, pageSize);
  }

  render() {
    let { myOpenLoanRequests, showPaging, isLoading, offset, totalItemsCount, setMyOpenedLoanRequestsOffset, fetchMyOpenedLoanRequests } = this.props;

    let rows = myOpenLoanRequests.map(loan => ({
      date: new Date(loan.creationTime),
      principalAmount: loan.principalAmount.toNumber(),
      principalTokenSymbol: loan.principalTokenSymbol,
      termLength: loan.termLength.toNumber(),
      amortizationUnit: loan.amortizationUnit,
      interestRate: loan.interestRate
    }));

    let pagesTotal = null;
    let currentPageNum = null;
    if (showPaging) {
      pagesTotal = parseInt(totalItemsCount / pageSize, 10);
      pagesTotal = (totalItemsCount / pageSize - pagesTotal) > 0 ? pagesTotal + 1 : pagesTotal;
      currentPageNum = Math.floor(offset / pageSize);
    }

    return (
      <LoanTableSmall
        header="My open loan requests"
        dateColumnHeader="Date loan requested"
        rows={rows}
        isLoading={isLoading}
        showPaging={showPaging}
        currentPageNum={currentPageNum}
        pagesTotal={pagesTotal}
        onPageClick={(pageNum) => {
          setMyOpenedLoanRequestsOffset(pageSize * pageNum);
          fetchMyOpenedLoanRequests(pageSize * pageNum, pageSize);
        }} />
    );
  }
}

let mapStateToProps = ({ myOpenLoanRequests: { values, isLoading, offset, showPaging, totalItemsCount } }) => ({
  myOpenLoanRequests: values,
  isLoading,
  offset,
  showPaging,
  totalItemsCount
});

let mapDispatchToProps = { fetchMyOpenedLoanRequests, setMyOpenedLoanRequestsOffset };

export default connect(mapStateToProps, mapDispatchToProps)(OpenLoanRequests);