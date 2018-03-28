import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {getLoansRequests} from '../../actions';
import LoanRequestsTable from '../../components/loan-request-table/loan-request-table';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.number.isRequired
};

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
    constructor(props) {
        super(props);

        this.fundClick = this.fundClick.bind(this);
    }

    fundClick() {
        this.props.dispatch();
    }

    render() {
        return (
            <LoanRequestsTable header="Loan Requests" rows={data}/>
        );
    }
}

LoanRequests.propTypes = propTypes;

function mapStateToProps(state) {
    const data = state.loans;

    return data;
}

export default connect(mapStateToProps, getLoansRequests)(LoanRequests);
