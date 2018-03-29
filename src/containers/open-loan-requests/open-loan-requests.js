import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSignedByDebtor} from '../../actions';
import LoanTableSmall from '../../components/loan-table-small/loan-table-small.js';

class OpenLoanRequests extends Component{
  componentDidMount(){
    this.props.fetchSignedByDebtor();
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