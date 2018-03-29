import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getIssuedLoans } from '../../actions';
import IssuedLoanTable from '../../components/issued-loan-table/issued-loan-table.js';

class IssuedLoans extends Component {
    componentDidMount(){
        this.props.getIssuedLoans();
    }

    render() {
        let {loanIssued} = this.props;

        return (
            <IssuedLoanTable header="Issued Loans" rows={loanIssued}/>
        );
    }
}

let mapStateToProps = ({loanIssued}) => ({
    loanIssued
});

let mapDispatchToProps = { getIssuedLoans };

export default connect(mapStateToProps, mapDispatchToProps)(IssuedLoans);
