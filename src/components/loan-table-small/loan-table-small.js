import React from 'react';
import './loan-table-small.css';
import { isFloat, calculateTermInDays, formatLoanscanLink } from '../../common/services/utilities';
import { SHOW_LOANSCAN_LINK } from '../../common/api/config';

function renderAmount(row) {
  let amountString = isFloat(row.principalAmount) ? row.principalAmount.toFixed(2) : row.principalAmount;
  if (SHOW_LOANSCAN_LINK && row.issuanceHash) {
    return (
      <td className="loan-table-small__table-cell">
        <a href={formatLoanscanLink(row.issuanceHash)}> {amountString} {row.principalTokenSymbol}</a>
      </td>
    )
  }

  return (
    <td className="loan-table-small__table-cell"> {amountString} {row.principalTokenSymbol} </td>
  )
}

function renderRows(rows) {
  let i = 0;

  return rows
    .sort((a, b) => a.date < b.date ? 1 : (-1))
    .map(row => {


      return (
        <tr key={i++}>
          <td className="loan-table-small__table-cell">{row.date.toLocaleDateString()} <br /> {row.date.toLocaleTimeString()}</td>
          {renderAmount(row)}
          <td className="loan-table-small__table-cell">{calculateTermInDays(row.amortizationUnit, row.termLength)} days</td>
          <td className="loan-table-small__table-cell">{row.interestRate + ' %'}</td>
        </tr>
      );
    });
}

function LoanTableSmall(props) {
  return (
    <div className="loan-table-small scrollable-table">
      <div className="loan-table-small__header">
        {props.header}
      </div>
      <table className="loan-table-small__table">
        <thead>
          <tr className="loan-table-small__table-headers">
            <th className="loan-table-small__table-header" title={props.dateColumnHeader}>{props.dateColumnHeader}</th>
            <th className="loan-table-small__table-header" title="Loan amount">Loan amount</th>
            <th className="loan-table-small__table-header" title="Loan term (days)">Loan term</th>
            <th className="loan-table-small__table-header" title="Interest rate (per payment period)">Interest rate</th>
          </tr>
        </thead>
        <tbody className="loan-table-small__table-body scrollable-table__table-body scrollable">
          {renderRows(props.rows)}
        </tbody>
      </table>
    </div>
  );
}

export default LoanTableSmall;