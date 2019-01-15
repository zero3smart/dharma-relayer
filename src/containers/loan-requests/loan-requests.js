import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getLoanRequests, fillLoanRequest, showFundConfirmation, hideFundConfirmation } from '../../actions';
import LoanRequestsTable from '../../components/loan-request-table/loan-request-table';
import {Modal, ModalBody} from '../../components/modal/modal';
import ConfirmFund from '../../components/confirm-fund/confirm-fund';
import {calculateRepaymentAmount} from '../../common/services/utilities';

let destroyTimer = null;

let startTimer = (func) => {
    destroyTimer = setTimeout(() => {
        func();
        startTimer(func);
    }, 10000)
};

class LoanRequests extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        let {getLoanRequests} = this.props;
        getLoanRequests();
        startTimer(getLoanRequests);
    }

    componentWillUnmount(){
        destroyTimer && destroyTimer();
    }

    render() {
        let {loanRequests, fundConfirmation, showFundConfirmation, hideFundConfirmation, fillLoanRequest} = this.props;

        let rows = loanRequests.map(loan => {
            const date = new Date(loan.creationTime);
            return {
                amount: loan.principalAmount,
                token: loan.dharmaDebtOrder.principalTokenSymbol,
                date: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
                term: loan.dharmaDebtOrder.termLength.toNumber(),
                interest: loan.dharmaDebtOrder.interestRate.toNumber() + '%',
                amortization: loan.dharmaDebtOrder.termLength.toNumber() + " " + loan.dharmaDebtOrder.amortizationUnit,
                repayment: calculateRepaymentAmount(loan.dharmaDebtOrder.principalAmount.toNumber(), loan.dharmaDebtOrder.interestRate.toNumber()),
                isProcessing: loan.isProcessing
            }
        });

        return (
            <div>
                <LoanRequestsTable header="Loan Requests" rows={rows} loans={loanRequests} onFundClick={showFundConfirmation}/>
                <Modal show={fundConfirmation.modalVisible} size="md" onModalClosed={hideFundConfirmation}>
                    <ModalBody>
                        {
                            fundConfirmation.modalVisible && fundConfirmation.loanRequest &&
                            <ConfirmFund loanRequest={fundConfirmation.loanRequest} onCancel={hideFundConfirmation} onConfirm={fillLoanRequest} />
                        }
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

let mapStateToProps = ({loanRequests, fundConfirmation}) => ({
    loanRequests,
    fundConfirmation
});

let mapDispatchToProps = { getLoanRequests, fillLoanRequest, showFundConfirmation, hideFundConfirmation };

export default connect(mapStateToProps, mapDispatchToProps)(LoanRequests);