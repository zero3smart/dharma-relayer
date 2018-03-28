import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchOpenLoanRequests} from '../../actions';
import LoanTableSmall from '../../components/loan-table-small/loan-table-small.js';

//let data = [
//  {
//    date: '2018-03-24 17:59:59',
//    amount: '120 ETH',
//    term: '90 day',
//    interest: '20%'
//  },
//  {
//    date: '2018-03-24 17:59:59',
//    amount: '120 ETH',
//    term: '90 day',
//    interest: '10%'
//  }
//];

class OpenLoanRequests extends Component{
  componentDidMount(){
    this.props.fetchOpenLoanRequests();
  }

  render(){
    let {openLoanRequests} = this.props;

    return (
      <LoanTableSmall header="My Open Loan Requests" rows={openLoanRequests}/>
    );
  }
}

let mapStateToProps = ({openLoanRequests}) => ({
  openLoanRequests
});

let mapDispatchToProps = {fetchOpenLoanRequests};

export default connect(mapStateToProps, mapDispatchToProps)(OpenLoanRequests);