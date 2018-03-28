import React, {Component} from 'react';
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

class LoanRequests extends Component{
  render(){
    return (
      <LoanRequestsTable header="Loan Requests" rows={data}/>
    );
  }
}

export default LoanRequests;