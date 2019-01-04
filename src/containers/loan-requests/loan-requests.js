import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getLoanRequests, fillLoanRequest } from '../../actions';
import LoanRequestsTable from '../../components/loan-request-table/loan-request-table';

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
        let {loanRequests, fillLoanRequest} = this.props;

        let rows = this.props.loanRequests.map(loan => {
            const date = new Date(loan.creationTime);
            return {
                amount: loan.principalAmount,
                token: loan.dharmaDebtOrder.principalTokenSymbol,
                date: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
                term: loan.dharmaDebtOrder.termLength.toNumber(),
                interest: loan.dharmaDebtOrder.interestRate.toNumber() + '%',
                amortization: loan.dharmaDebtOrder.termLength.toNumber() + " " + loan.dharmaDebtOrder.amortizationUnit,
                repayment: loan.dharmaDebtOrder.principalAmount.toNumber() * (1 + loan.dharmaDebtOrder.interestRate.toNumber() * loan.dharmaDebtOrder.termLength.toNumber()),
                isProcessing: loan.isProcessing
            }
        });

        return (
            <LoanRequestsTable header="Loan Requests" rows={rows} loans={loanRequests} fundFunction={fillLoanRequest}/>
        );
    }
}

let mapStateToProps = ({loanRequests}) => ({
    loanRequests
});

let mapDispatchToProps = { getLoanRequests, fillLoanRequest };

export default connect(mapStateToProps, mapDispatchToProps)(LoanRequests);