import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchMyOutstandingLoans, setMyOutstandingLoansOffset } from '../../actions';
import LoanTableSmall from '../../components/loan-table-small/loan-table-small.js';
import RepayLoanModal from './RepayLoanModal'
import { repayLoan } from "../../common/services/dharmaService";

const pageSize = 5;

let destroyTimer = null;
let startTimer = (func) => {
  destroyTimer = setTimeout(() => {
    func();
    startTimer(func);
  }, 10000)
};

class OutstandingLoans extends Component {
  state = {
    loan: null,
    isRepayModalOpened: false,
  }

  constructor(props) {
    super(props);

    this.getOutstandingLoansForCurrentPage = this.getOutstandingLoansForCurrentPage.bind(this);
  }

  componentDidMount() {
    let { getOutstandingLoansForCurrentPage } = this;
    getOutstandingLoansForCurrentPage();
    startTimer(getOutstandingLoansForCurrentPage);
  }

  componentWillUnmount() {
    destroyTimer && destroyTimer();
  }

  getOutstandingLoansForCurrentPage() {
    let { offset, fetchMyOutstandingLoans } = this.props;
    let currentPageNum = Math.floor(offset / pageSize);

    fetchMyOutstandingLoans(pageSize * currentPageNum, pageSize);
  }

  handleOpenModal = () =>
    this.setState(prevState => ({
      isRepayModalOpened: true
    })
    )

  handleCloseModal = () =>
    this.setState(prevState => ({
      isRepayModalOpened: false
    })
    )

  handleRepayModal = loan => {
    this.setState(prevState => ({ loan }))
    this.handleOpenModal()
  }

  onRepay = ({ issuanceHash, amount, token }) => {
    this.handleCloseModal()
    repayLoan(issuanceHash, amount, token)
  }

  render() {
    let { myOutstandingLoans, showPaging, isLoading, offset, totalItemsCount, setMyOutstandingLoansOffset, fetchMyOutstandingLoans } = this.props;

    let rows = myOutstandingLoans.map(loan => ({
      date: new Date(loan.issuanceBlockTime),
      principalAmount: loan.principalAmount.toNumber(),
      principalTokenSymbol: loan.principalTokenSymbol,
      termLength: loan.termLength.toNumber(),
      amortizationUnit: loan.amortizationUnit,
      interestRate: loan.interestRate,
      issuanceHash: loan.issuanceHash
    }));

    return (
      <Fragment>
        <LoanTableSmall
          header="My outstanding loans"
          dateColumnHeader="Date loan issued"
          repayAvailable={true}
          handleRepay={this.handleRepayModal}
          rows={rows}
          isLoading={isLoading}
          showPaging={showPaging}
          offset={offset}
          totalItemsCount={totalItemsCount}
          pageSize={pageSize}
          onPageClick={(pageNum) => {
            setMyOutstandingLoansOffset(pageSize * pageNum);
            fetchMyOutstandingLoans(pageSize * pageNum, pageSize);
          }} />
        <RepayLoanModal
          loan={this.state.loan}
          isOpen={this.state.isRepayModalOpened}
          handleClose={this.handleCloseModal}
          onRepay={this.onRepay}
        />
      </Fragment>
    );
  }
}

let mapStateToProps = ({ myOutstandingLoans: { values, isLoading, offset, showPaging, totalItemsCount } }) => ({
  myOutstandingLoans: values,
  isLoading,
  offset,
  showPaging,
  totalItemsCount
});

let mapDispatchToProps = { fetchMyOutstandingLoans, setMyOutstandingLoansOffset };

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingLoans);