import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getIssuedLoans } from '../../actions';
import IssuedLoanTable from '../../components/issued-loan-table/issued-loan-table.js';

let destroyTimer = null;

let startTimer = (func) => {
    destroyTimer = setTimeout(() => {
        func();
        startTimer(func);
    }, 10000)
};

class IssuedLoans extends Component {

    componentDidMount(){
        let {getIssuedLoans} = this.props;
        getIssuedLoans();
        startTimer(getIssuedLoans);
    }

    componentWillUnmount(){
        destroyTimer && destroyTimer();
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