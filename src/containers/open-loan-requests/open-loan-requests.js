import React, {Component} from 'react';
import LoanTableSmall from '../../components/loan-table-small/loan-table-small.js';

let data = [
  {
    date: '2018-03-24 17:59:59',
    amount: '120 ETH',
    term: '90 day',
    interest: '20%'
  },
  {
    date: '2018-03-24 17:59:59',
    amount: '120 ETH',
    term: '90 day',
    interest: '10%'
  }
];

class OpenLoanRequests extends Component{
  render(){
    return (
      <LoanTableSmall header="My Open Loan Requests" rows={data}/>
    );
  }
}

export default OpenLoanRequests;