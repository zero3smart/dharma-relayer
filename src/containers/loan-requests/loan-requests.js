import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { getLoanRequests } from '../../actions';
import LoanRequestsTable from '../../components/loan-request-table/loan-request-table';

let data = [
    {
        date: '2018-03-21/2018-04/21',
        amount: '100',
        token: 'ETH',
        term: '30',
        interest: '24',
        colAmount: '150',
        colToken: 'ETH',
        amortization: '30',
        repayment: '102',
        underwriter: 'N/A',
        score: 'N/A',
    }, {
        date: '2018-03-21/2018-04/21',
        amount: '100',
        token: 'ETH',
        term: '30',
        interest: '24',
        colAmount: '150',
        colToken: 'ETH',
        amortization: '30',
        repayment: '102',
        underwriter: 'N/A',
        score: 'N/A',
    }, {
        date: '2018-03-21/2018-04/21',
        amount: '100',
        token: 'ETH',
        term: '30',
        interest: '24',
        colAmount: '150',
        colToken: 'ETH',
        amortization: '30',
        repayment: '102',
        underwriter: 'N/A',
        score: 'N/A',
    }
];

class LoanRequests extends Component {
    componentDidMount(){
        this.props.getLoanRequests();
    }

    render() {
        let {loanRequests} = this.props;
        
        return (
            <LoanRequestsTable header="Loan Requests" rows={loanRequests}/>
        );
    }
}

let mapStateToProps = ({loanRequests}) => ({
    loanRequests
});

let mapDispatchToProps = { getLoanRequests };

export default connect(mapStateToProps, mapDispatchToProps)(LoanRequests);
