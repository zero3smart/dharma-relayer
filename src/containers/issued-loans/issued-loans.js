import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIssuedLoans, setIssuedLoansOffset } from '../../actions';
import IssuedLoanTable from '../../components/issued-loan-table/issued-loan-table.js';
import Paging from '../../components/paging/paging.js';
import Spinner from '../../components/spinner/spinner.js';
import '../../common/styles/pagination.css';
import './issued-loans.css';

const pageSize = 40;

let destroyTimer = null;
let startTimer = (func) => {
    destroyTimer = setTimeout(() => {
        func();
        startTimer(func);
    }, 10000)
};

class IssuedLoans extends Component {
    constructor(props) {
        super(props);

        this.getIssuedLoansForCurrentPage = this.getIssuedLoansForCurrentPage.bind(this);
    }

    componentDidMount() {
        let { getIssuedLoansForCurrentPage } = this;
        getIssuedLoansForCurrentPage();
        startTimer(getIssuedLoansForCurrentPage);
    }

    getIssuedLoansForCurrentPage() {
        let { offset, getIssuedLoans } = this.props;
        let currentPageNum = Math.floor(offset / pageSize);

        getIssuedLoans(pageSize * currentPageNum, pageSize);
    }

    componentWillUnmount() {
        destroyTimer && destroyTimer();
    }

    renderPagination() {
        let { getIssuedLoans, setIssuedLoansOffset, offset, totalItemsCount } = this.props;

        let pagesTotal = parseInt(totalItemsCount / pageSize, 10);
        pagesTotal = (totalItemsCount / pageSize - pagesTotal) > 0 ? pagesTotal + 1 : pagesTotal;
        let currentPageNum = Math.floor(offset / pageSize);

        return (
            <Paging
                currentPageNum={currentPageNum}
                onPageClick={(pageNum) => {
                    setIssuedLoansOffset(pageSize * pageNum);
                    getIssuedLoans(pageSize * pageNum, pageSize);
                }
                }
                pagesTotal={pagesTotal}
                visiblePagesCount={5} />
        );
    }

    render() {
        let { loanIssued, showPaging, isLoading } = this.props;

        if (isLoading) {
            return (
                <div className="issued-loans__spinner-container">
                    <Spinner />
                </div>
            );
        }

        return (
            <div>
                <IssuedLoanTable header="Issued Loans" rows={loanIssued} />
                <div className="relayer-pagination">
                    {showPaging && this.renderPagination()}
                </div>
            </div>
        );
    }
}

let mapStateToProps = ({ loanIssued }) => ({
    loanIssued: loanIssued.values,
    isLoading: loanIssued.isLoading,
    offset: loanIssued.offset,
    showPaging: loanIssued.showPaging,
    totalItemsCount: loanIssued.totalItemsCount
});

let mapDispatchToProps = { getIssuedLoans, setIssuedLoansOffset };

export default connect(mapStateToProps, mapDispatchToProps)(IssuedLoans);