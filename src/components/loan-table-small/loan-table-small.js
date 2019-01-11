import React from 'react';
import './loan-table-small.css';


function renderRows(rows){
  let i=0;
  return rows.map(row => {
    let date = new Date(row.creationTime);
    return (
      <tr key={i++}>
        <td className="loan-table-small__table-cell">{date.toLocaleDateString()} <br /> {date.toLocaleTimeString()}</td>
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