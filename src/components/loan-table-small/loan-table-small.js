import React from 'react';
import './loan-table-small.css';


function renderRows(rows){
  let i=0;
  return rows.map(row => {
    return (
        <tr key={i++}>
          <td className="loan-table-small__table-cell">{row.date}</td>
          <td className="loan-table-small__table-cell">{row.amount}</td>
          <td className="loan-table-small__table-cell">{row.term}</td>
          <td className="loan-table-small__table-cell">{row.interest}</td>
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
        <tbody>
          {renderRows(props.rows)}
        </tbody>
      </table>
    </div>
  );
}

export default LoanTableSmall;