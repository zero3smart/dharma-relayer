import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchFilledDebts} from '../../actions';
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

class OutstandingLoans extends Component{

  componentDidMount(){
    this.props.fetchFilledDebts();
  }

  render(){
    let {filledDebts} = this.props;
    return (
      <LoanTableSmall header="My outstading loans" rows={filledDebts}/>
    );
  }
}

let mapStateToProps = ({filledDebts}) => ({
  filledDebts
});

let mapDispatchToProps = {fetchFilledDebts};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingLoans);