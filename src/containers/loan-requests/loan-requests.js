import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLoanRequests, fillLoanRequest, showFundConfirmation, hideFundConfirmation, runGlobalUpdate, getTokenBalance } from '../../actions';
import LoanRequestsTable from '../../components/loan-request-table/loan-request-table';
import { Modal, ModalBody } from '../../components/modal/modal';
import ConfirmFund from '../../components/confirm-fund/confirm-fund';
import Spinner from '../../components/spinner/spinner.js';
import './loan-requests.css';

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
    }

    componentDidMount() {
        let { getLoanRequests } = this.props;
        getLoanRequests();
        startTimer(getLoanRequests);
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

    render() {
        let { loanRequests, fundConfirmation, showFundConfirmation, hideFundConfirmation, fillLoan, isLoading } = this.props;

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
    fillLoan
});

let mapDispatchToProps = { getLoanRequests, fillLoanRequest, showFundConfirmation, hideFundConfirmation, runGlobalUpdate, getTokenBalance };

export default connect(mapStateToProps, mapDispatchToProps)(LoanRequests);