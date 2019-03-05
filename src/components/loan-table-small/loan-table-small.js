import React from 'react';
import './loan-table-small.css';
import { isFloat, calculateTermInDays, formatLoanscanLink } from '../../common/services/utilities';
import { SHOW_LOANSCAN_LINK } from '../../common/api/config';
import Paging from '../../components/paging/paging.js';
import Spinner from '../../components/spinner/spinner.js';


function renderAmount(row) {
  let amountString = isFloat(row.principalAmount) ? row.principalAmount.toFixed(2) : row.principalAmount;
  if (SHOW_LOANSCAN_LINK && row.issuanceHash) {
    return (
      <td className="loan-table-small__table-cell">
        <a href={formatLoanscanLink(row.issuanceHash)} target="_blank"><strong>{amountString}</strong> {row.principalTokenSymbol}</a>
      </td>
    )
  }

  return (
    <td className="loan-table-small__table-cell"><strong>{amountString}</strong> {row.principalTokenSymbol} </td>
  )
}

function renderRows(rows) {
  let i = 0;

  return rows
    .sort((a, b) => a.date < b.date ? 1 : (-1))
    .map(row => {


      return (
        <tr key={i++}>
          <td className="loan-table-small__table-cell">{row.date.toLocaleDateString()} {row.date.toLocaleTimeString()}</td>
          {renderAmount(row)}
          <td className="loan-table-small__table-cell"><strong>{row.interestRate.toString()}</strong> %</td>
          <td className="loan-table-small__table-cell"><strong>{calculateTermInDays(row.amortizationUnit, row.termLength)}</strong> d</td>
        </tr>
      );
    });
}

function renderPagination({ currentPageNum, pagesTotal, onPageClick }) {
  return (
    <div className="relayer-pagination">
      <Paging
        currentPageNum={currentPageNum}
        onPageClick={onPageClick}
        pagesTotal={pagesTotal}
        visiblePagesCount={5} />
    </div>
  );
}

function LoanTableSmall(props) {
  if (props.isLoading) {
    return (
      <Spinner />
    );
  }
  return (
    <React.Fragment>
      <div className="loan-table-small scrollable-table">
        <div className="loan-table-small__header">
          {props.header}
        </div>
        <table className="loan-table-small__table">
          <thead>
            <tr>
              <th className="loan-table-small__table-header" title={props.dateColumnHeader}>Date</th>
              <th className="loan-table-small__table-header" title="Loan amount">Amount</th>
              <th className="loan-table-small__table-header" title="Interest rate (per payment period)">Interest</th>
              <th className="loan-table-small__table-header" title="Loan term (days)">Term</th>
            </tr>
          </thead>
          <tbody className="loan-table-small__table-body scrollable-table__table-body scrollable">
            {renderRows(props.rows)}
          </tbody>
        </table>
      </div>
      {props.showPaging && renderPagination(props)}
    </React.Fragment>
  );
}

export default LoanTableSmall;