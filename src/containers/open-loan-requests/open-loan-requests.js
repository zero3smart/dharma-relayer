import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMyOpenedLoanRequests, setMyOpenedLoanRequestsOffset } from '../../actions';
import LoanTableSmall from '../../components/loan-table-small/loan-table-small.js';

const pageSize = 5;

let timer = null;
let startTimer = (func) => {
	timer = setTimeout(() => {
		func();
		startTimer(func);
	}, 10000)
};

class OpenLoanRequests extends Component {
	constructor(props) {
		super(props);

		this.getOpenLoansForCurrentPage = this.getOpenLoansForCurrentPage.bind(this);
	}

	componentDidMount() {
		let { getOpenLoansForCurrentPage } = this;
		getOpenLoansForCurrentPage();
		startTimer(getOpenLoansForCurrentPage);
	}

	componentWillUnmount() {
		timer && clearTimeout(timer);
	}

	getOpenLoansForCurrentPage() {
		let { offset, fetchMyOpenedLoanRequests } = this.props;
		let currentPageNum = Math.floor(offset / pageSize);

		fetchMyOpenedLoanRequests(pageSize * currentPageNum, pageSize);
	}

	render() {
		let { myOpenLoanRequests, showPaging, isLoading, offset, totalItemsCount, setMyOpenedLoanRequestsOffset, fetchMyOpenedLoanRequests } = this.props;

		let rows = myOpenLoanRequests.map(loan => ({
			date: new Date(loan.creationTime),
			principalAmount: loan.principalAmount,
			principalTokenSymbol: loan.principalTokenSymbol,
			termLength: loan.termLength,
			amortizationUnit: loan.amortizationUnit,
			interestRate: loan.interestRate
		}));

		return (
			<LoanTableSmall
				header="My open loan requests"
				dateColumnHeader="Date loan requested"
				rows={rows}
				isLoading={isLoading}
				showPaging={showPaging}
				offset={offset}
				totalItemsCount={totalItemsCount}
				pageSize={pageSize}
				onPageClick={(pageNum) => {
					setMyOpenedLoanRequestsOffset(pageSize * pageNum);
					fetchMyOpenedLoanRequests(pageSize * pageNum, pageSize);
				}} />
		);
	}
}

let mapStateToProps = ({ myOpenLoanRequests: { values, isLoading, offset, showPaging, totalItemsCount } }) => ({
	myOpenLoanRequests: values,
	isLoading,
	offset,
	showPaging,
	totalItemsCount
});

let mapDispatchToProps = { fetchMyOpenedLoanRequests, setMyOpenedLoanRequestsOffset };

export default connect(mapStateToProps, mapDispatchToProps)(OpenLoanRequests);