import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSignedByDebtor} from '../../actions';
import LoanTableSmall from '../../components/loan-table-small/loan-table-small.js';

let destroyTimer = null;

let startTimer = (func) => {
  destroyTimer = setTimeout(() => {
    func();
    startTimer(func);
  }, 10000)
};

class OpenLoanRequests extends Component{
  componentDidMount(){
    let {fetchSignedByDebtor} = this.props;
    fetchSignedByDebtor();
    startTimer(fetchSignedByDebtor);
  }

  componentWillUnmount(){
    destroyTimer && destroyTimer();
  }

  render(){
    let {signedByDebtor} = this.props;

    return (
      <LoanTableSmall header="My Open Loan Requests" rows={signedByDebtor}/>
    );
  }
}

let mapStateToProps = ({signedByDebtor}) => ({
  signedByDebtor
});

let mapDispatchToProps = {fetchSignedByDebtor};

export default connect(mapStateToProps, mapDispatchToProps)(OpenLoanRequests);