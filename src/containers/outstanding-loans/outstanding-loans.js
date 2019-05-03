import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  fetchMyOutstandingLoans,
  setMyOutstandingLoansOffset,
  repayLoanInit,
  repayLoanSuccess,
  repayLoanFail,
  repayLoanResetStatus
} from '../../actions';
import LoanTableSmall from '../../components/loan-table-small/loan-table-small.js';
import {Modal, ModalBody} from '../../components/modal/modal';
import RepayLoanModal from './RepayLoanModal'
import { repayLoan } from "../../common/services/dharmaService";
import {} from "../../actions/repayLoan";

const pageSize = 5;

let timer = null;
let startTimer = (func) => {
  timer = setTimeout(() => {
    func();
    startTimer(func);
  }, 10000)
};

class OutstandingLoans extends Component {
  state = {
    loan: null,
    isRepayModalOpened: false,
  };

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
    timer && clearTimeout(timer);
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
    );

  handleCloseModal = () =>
    this.setState(prevState => ({
        isRepayModalOpened: false
      }), () => this.props.repayLoanResetStatus()
    );

  handleRepayModal = loan => {
    this.setState(prevState => ({ loan }));
    this.handleOpenModal()
  };

  onRepay = ({ issuanceHash, amount, token }) => {
    this.props.repayLoanInit();
    repayLoan(issuanceHash, amount, token)
      .then(loan => {
        this.props.repayLoanSuccess(loan)
      })
      .catch(err => {
        console.error(err);
        alert(err);
        this.props.repayLoanFail(err)
      })
  };

  render() {
    let { myOutstandingLoans, showPaging, isLoading, offset, totalItemsCount, setMyOutstandingLoansOffset, fetchMyOutstandingLoans } = this.props;

    let rows = myOutstandingLoans.map(loan => ({
      date: new Date(loan.issuanceBlockTime),
      principalAmount: loan.principalAmount,
      principalTokenSymbol: loan.principalTokenSymbol,
      termLength: loan.termLength,
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
          onRepay={this.handleRepayModal}
          rows={rows}
          isLoading={isLoading}
          showPaging={showPaging}
          offset={offset}
          totalItemsCount={totalItemsCount}
          pageSize={pageSize}
          onPageClick={(pageNum) => {
            setMyOutstandingLoansOffset(pageSize * pageNum);
            fetchMyOutstandingLoans(pageSize * pageNum, pageSize);
          }}/>
        <Modal show={this.state.isRepayModalOpened} size="md" onModalClosed={this.handleCloseModal}>
          {
            this.state.loan &&
            <ModalBody>
              <RepayLoanModal
                loan={this.state.loan}
                isLoading={this.props.repayLoanLoading}
                handleClose={this.handleCloseModal}
                repayLoanComplete={this.props.repayLoanComplete}
                onRepay={this.onRepay}
              />
            </ModalBody>
          }
        </Modal>

      </Fragment>
    );
  }
}

let mapStateToProps = ({ myOutstandingLoans:{ values, isLoading, offset, showPaging, totalItemsCount }, repayLoan }) => ({
  myOutstandingLoans: values,
  isLoading,
  offset,
  showPaging,
  totalItemsCount,
  repayLoanLoading: repayLoan.isLoading,
  repayLoanComplete: repayLoan.complete
});

let mapDispatchToProps = {
  fetchMyOutstandingLoans,
  setMyOutstandingLoansOffset,
  repayLoanInit,
  repayLoanSuccess,
  repayLoanFail,
  repayLoanResetStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingLoans);