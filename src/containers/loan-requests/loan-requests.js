import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getLoanRequests, fillLoanRequest, showFundConfirmation, hideFundConfirmation, runTablesUpdate } from '../../actions';
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
        let {loanRequests, fundConfirmation, showFundConfirmation, hideFundConfirmation, fillLoan, fillLoanRequest, runTablesUpdate} = this.props;

        let rows = loanRequests
            .map(loan => ({...loan, creationTime: new Date(loan.creationTime)}))
            .sort((a,b) => a.creationTime < b.creationTime ? 1 : (-1))
            .map(loan => ({
                amount: loan.principalAmount,
                token: loan.dharmaDebtOrder.principalTokenSymbol,
                date: loan.creationTime.toLocaleDateString() + " " + loan.creationTime.toLocaleTimeString(),
                term: loan.dharmaDebtOrder.termLength.toNumber(),
                interest: loan.dharmaDebtOrder.interestRate.toNumber() + '%',
                amortization: loan.dharmaDebtOrder.termLength.toNumber() + " " + loan.dharmaDebtOrder.amortizationUnit,
                repayment: calculateRepaymentAmount(loan.dharmaDebtOrder.principalAmount.toNumber(), loan.dharmaDebtOrder.interestRate.toNumber()),
                isLoading: loan.isLoading
            }));

        return (
            <div>
                <LoanRequestsTable header="Loan Requests" rows={rows} loans={loanRequests} onFundClick={showFundConfirmation}/>
                <Modal show={fundConfirmation.modalVisible} size="md" onModalClosed={hideFundConfirmation}>
                    <ModalBody>
                        {
                            fundConfirmation.modalVisible && fundConfirmation.loanRequest &&
                            <ConfirmFund loanRequest={fundConfirmation.loanRequest} onCancel={hideFundConfirmation} onConfirm={(debtOrder) => fillLoanRequest(debtOrder, runTablesUpdate)} isLoading={fillLoan.isLoading}/>
                        }
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

let mapStateToProps = ({loanRequests, fundConfirmation, fillLoan}) => ({
    loanRequests,
    fundConfirmation,
    fillLoan
});

let mapDispatchToProps = { getLoanRequests, fillLoanRequest, showFundConfirmation, hideFundConfirmation, runTablesUpdate };

export default connect(mapStateToProps, mapDispatchToProps)(LoanRequests);