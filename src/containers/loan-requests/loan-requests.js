import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getLoanRequests } from '../../actions';
import LoanRequestsTable from '../../components/loan-request-table/loan-request-table';

class LoanRequests extends Component {
    componentDidMount(){
        this.props.getLoanRequests();
    }

    render() {
        let {loanRequests} = this.props;

        return (
            <LoanRequestsTable header="Loan Requests" rows={loanRequests}/>
        );
    }
}

let mapStateToProps = ({loanRequests}) => ({
    loanRequests
});

let mapDispatchToProps = { getLoanRequests };

export default connect(mapStateToProps, mapDispatchToProps)(LoanRequests);
