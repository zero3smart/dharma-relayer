import React from 'react';
import './loan-table-small.css';


function renderRows(rows){
  let i=0;
  return rows
    .map(row => ({...row, creationTime: new Date(row.creationTime)}))
    .sort((a,b) => a.creationTime < b.creationTime ? 1 : (-1))
    .map(row => {
      return (
        <tr key={i++}>
          <td className="loan-table-small__table-cell">{row.creationTime.toLocaleDateString()} <br /> {row.creationTime.toLocaleTimeString()}</td>
          <td className="loan-table-small__table-cell">{`${row.principalAmount.toNumber()} ${row.principalTokenSymbol}`}</td>
          <td className="loan-table-small__table-cell">{`${row.termLength.toNumber()} ${row.amortizationUnit}`}</td>
          <td className="loan-table-small__table-cell">{row.interestRate + ' %'}</td>
        </tr>
      );
    });
}

function LoanTableSmall(props){
  return (
    <div className="loan-table-small">
      <div className="loan-table-small__header">
        {props.header}
      </div>
      <table className="loan-table-small__table">
        <thead>
          <tr className="loan-table-small__table-headers">
            <th className="loan-table-small__table-header">Date loan requested</th>
            <th className="loan-table-small__table-header">Loan amount</th>
            <th className="loan-table-small__table-header">Loan term</th>
            <th className="loan-table-small__table-header">Interest rate</th>
          </tr>
        </thead>
        <tbody className="loan-table-small__table-body">
          {renderRows(props.rows)}
        </tbody>
      </table>
    </div>
  );
}

export default LoanTableSmall;