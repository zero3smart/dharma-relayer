import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchMyOpenedLoanRequests, setMyOpenedLoanRequestsOffset, showCancelConfirmation, hideCancelConfirmation, cancelLoanRequest } from '../../actions';
import LoanTableSmall from '../../components/loan-table-small/loan-table-small.js';
import { Modal, ModalBody } from '../../components/modal/modal';
import ConfirmLoanCancel from '../../components/confirm-loan-cancel/confirm-loan-cancel';

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
		this.confirmLoanCancellation = this.confirmLoanCancellation.bind(this);
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

	confirmLoanCancellation(issuanceHash) {
		const { hideCancelConfirmation, cancelLoanRequest } = this.props;
		const { getOpenLoansForCurrentPage } = this;

		cancelLoanRequest(issuanceHash, () => {
			hideCancelConfirmation();
			getOpenLoansForCurrentPage();
		});
	}

	render() {
		let {
			myOpenLoanRequests,
			showPaging,
			isLoading,
			offset,
			totalItemsCount,
			setMyOpenedLoanRequestsOffset,
			fetchMyOpenedLoanRequests,
			cancelConfirmationVisible,
			showCancelConfirmation,
			hideCancelConfirmation
		} = this.props;


		let rows = myOpenLoanRequests.map(loan => ({
			date: new Date(loan.creationTime),
			principalAmount: loan.principalAmount,
			principalTokenSymbol: loan.principalTokenSymbol,
			termLength: loan.termLength,
			amortizationUnit: loan.amortizationUnit,
			interestRate: loan.interestRate
		}));

		return (
			<Fragment>
				<LoanTableSmall
					header="My open loan requests"
					dateColumnHeader="Date loan requested"
					cancelLoanAvailable={true}
					onCancelLoan={showCancelConfirmation}
					rows={rows}
					isLoading={isLoading}
					showPaging={showPaging}
					offset={offset}
					totalItemsCount={totalItemsCount}
					pageSize={pageSize}
					onPageClick={
						(pageNum) => {
							setMyOpenedLoanRequestsOffset(pageSize * pageNum);
							fetchMyOpenedLoanRequests(pageSize * pageNum, pageSize);
						}}
				/>
				<Modal show={cancelConfirmationVisible} size="md" onModalClosed={hideCancelConfirmation}>
					<ModalBody>
						<ConfirmLoanCancel
							onConfirm={this.confirmLoanCancellation}
							onCancel={hideCancelConfirmation} />
					</ModalBody>
				</Modal>
			</Fragment>
		);
	}
}

let mapStateToProps = ({ myOpenLoanRequests: { values, isLoading, offset, showPaging, totalItemsCount, cancelConfirmationVisible } }) => ({
	myOpenLoanRequests: values,
	isLoading,
	offset,
	showPaging,
	totalItemsCount,
	cancelConfirmationVisible
});

let mapDispatchToProps = { fetchMyOpenedLoanRequests, setMyOpenedLoanRequestsOffset, showCancelConfirmation, hideCancelConfirmation, cancelLoanRequest };

export default connect(mapStateToProps, mapDispatchToProps)(OpenLoanRequests);