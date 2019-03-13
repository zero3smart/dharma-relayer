import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLoanRequests, fillLoanRequest, showFundConfirmation, hideFundConfirmation, runGlobalUpdate, getTokenBalance, setLoanRequestsOffset } from '../../actions';
import LoanRequestsTable from '../../components/loan-request-table/loan-request-table';
import { Modal, ModalBody } from '../../components/modal/modal';
import ConfirmFund from '../../components/confirm-fund/confirm-fund';
import Spinner from '../../components/spinner/spinner.js';
import Paging from '../../components/paging/paging.js';
import './loan-requests.css';
import '../../common/styles/pagination.css';

const pageSize = 18;

let destroyTimer = null;
let startTimer = (func) => {
    destroyTimer = setTimeout(() => {
        func();
        startTimer(func);
    }, 5000)
};

class LoanRequests extends Component {

    constructor(props) {
        super(props);

        this.confirmFillLoanRequest = this.confirmFillLoanRequest.bind(this);
        this.getLoanRequestsForCurrentPage = this.getLoanRequestsForCurrentPage.bind(this);
    }

    componentDidMount() {
        let { getLoanRequestsForCurrentPage } = this;
        getLoanRequestsForCurrentPage();
        startTimer(getLoanRequestsForCurrentPage);
    }

    getLoanRequestsForCurrentPage() {
        let { offset, getLoanRequests } = this.props;
        let currentPageNum = Math.floor(offset / pageSize);

        getLoanRequests(pageSize * currentPageNum, pageSize);
    }

    componentWillUnmount() {
        destroyTimer && destroyTimer();
    }

    confirmFillLoanRequest(debtOrder) {
        let { fillLoanRequest, runGlobalUpdate, getTokenBalance } = this.props;
        fillLoanRequest(debtOrder, () => {
            runGlobalUpdate();
            getTokenBalance(debtOrder.dharmaDebtOrder.principalTokenSymbol);
        })
    }

    renderPagination() {
        let { getLoanRequests, setLoanRequestsOffset, offset, totalItemsCount } = this.props;

        return (
            <Paging
                offset={offset}
                totalItemsCount={totalItemsCount}
                pageSize={pageSize}
                onPageClick={(pageNum) => {
                    setLoanRequestsOffset(pageSize * pageNum);
                    getLoanRequests(pageSize * pageNum, pageSize);
                }
                }
                visiblePagesCount={10} />
        );
    }

    render() {
        let { loanRequests, fundConfirmation, showFundConfirmation, hideFundConfirmation, fillLoan, isLoading, showPaging } = this.props;

        if (isLoading) {
            return (
                <div className="loan-requests__spinner-container">
                    <Spinner />
                </div>
            );
        }

        return (
            <div>
                <LoanRequestsTable header="Loan Requests" rows={loanRequests} onFundClick={showFundConfirmation} />
                <div className="relayer-pagination">
                    {showPaging && this.renderPagination()}
                </div>
                <Modal show={fundConfirmation.modalVisible} size="md" onModalClosed={hideFundConfirmation}>
                    <ModalBody>
                        {
                            fundConfirmation.modalVisible && fundConfirmation.loanRequest &&
                            <ConfirmFund loanRequest={fundConfirmation.loanRequest} onCancel={hideFundConfirmation} onConfirm={this.confirmFillLoanRequest} isLoading={fillLoan.isLoading} />
                        }
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

let mapStateToProps = ({ loanRequests, fundConfirmation, fillLoan }) => ({
    loanRequests: loanRequests.values,
    isLoading: loanRequests.isLoading,
    fundConfirmation,
    fillLoan,
    offset: loanRequests.offset,
    showPaging: loanRequests.showPaging,
    totalItemsCount: loanRequests.totalItemsCount
});

let mapDispatchToProps = { getLoanRequests, fillLoanRequest, showFundConfirmation, hideFundConfirmation, runGlobalUpdate, getTokenBalance, setLoanRequestsOffset };

export default connect(mapStateToProps, mapDispatchToProps)(LoanRequests);