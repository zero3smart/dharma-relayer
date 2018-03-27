import React, {Component} from 'react';
import IssuedLoanTable from '../../components/issued-loan-table/issued-loan-table.js';

let data = [
    {
        date: '2018-03-21 17:35:50',
        amount: '20',
        token: 'ETH',
        term: '30',
        interest: '150'
    },{
        date: '2018-03-21 17:35:50',
        amount: '20',
        token: 'ETH',
        term: '30',
        interest: '150'
    },{
        date: '2018-03-21 17:35:50',
        amount: '20',
        token: 'ETH',
        term: '30',
        interest: '150'
    },{
        date: '2018-03-21 17:35:50',
        amount: '20',
        token: 'ETH',
        term: '30',
        interest: '150'
    },{
        date: '2018-03-21 17:35:50',
        amount: '20',
        token: 'ETH',
        term: '30',
        interest: '150'
    },{
        date: '2018-03-21 17:35:50',
        amount: '20',
        token: 'ETH',
        term: '30',
        interest: '150'
    }
];

class IssuedLoans extends Component{
  render(){
    return (
      <IssuedLoanTable header="Issued Loans" rows={data}/>
    );
  }
}

export default IssuedLoans;
