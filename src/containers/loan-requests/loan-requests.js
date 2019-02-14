import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getLoanRequests, fillLoanRequest, showFundConfirmation, hideFundConfirmation, runGlobalUpdate } from '../../actions';
import LoanRequestsTable from '../../components/loan-request-table/loan-request-table';
import {Modal, ModalBody} from '../../components/modal/modal';
import ConfirmFund from '../../components/confirm-fund/confirm-fund';

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
        let {loanRequests, fundConfirmation, showFundConfirmation, hideFundConfirmation, fillLoan, fillLoanRequest, runGlobalUpdate} = this.props;

        return (
            <div>
                <LoanRequestsTable header="Loan Requests" rows={loanRequests} onFundClick={showFundConfirmation}/>
                <Modal show={fundConfirmation.modalVisible} size="md" onModalClosed={hideFundConfirmation}>
                    <ModalBody>
                        {
                            fundConfirmation.modalVisible && fundConfirmation.loanRequest &&
                            <ConfirmFund loanRequest={fundConfirmation.loanRequest} onCancel={hideFundConfirmation} onConfirm={(debtOrder) => fillLoanRequest(debtOrder, runGlobalUpdate)} isLoading={fillLoan.isLoading}/>
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

let mapDispatchToProps = { getLoanRequests, fillLoanRequest, showFundConfirmation, hideFundConfirmation, runGlobalUpdate };

export default connect(mapStateToProps, mapDispatchToProps)(LoanRequests);