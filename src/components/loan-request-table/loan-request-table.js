import React from 'react';
import './loan-request-table.css';
import {calculateRepaymentAmount} from '../../common/services/utilities';

function renderRows(rows, fundFunction) {
  let i = 0;

  return rows
      .map(row => ({...row, creationTimeParsed: new Date(row.creationTime)}))
      .sort((a,b) => a.creationTimeParsed < b.creationTimeParsed ? 1 : (-1))
          .map(row => {
              let termLength = row.dharmaDebtOrder.termLength.toNumber();
              let interestRate = row.dharmaDebtOrder.interestRate.toNumber();
              let repayment = calculateRepaymentAmount(row.dharmaDebtOrder.principalAmount.toNumber(), interestRate);

              return (
                  <tr key={i++}>
                      <td className="loan-table-small__table-cell">{row.creationTimeParsed.toLocaleDateString() + " " + row.creationTimeParsed.toLocaleTimeString()}</td>
                      <td className="loan-table-small__table-cell">{row.principalAmount} {row.dharmaDebtOrder.principalTokenSymbol}</td>
                      <td className="loan-table-small__table-cell">{interestRate + '%'}</td>
                      <td className="loan-table-small__table-cell">{termLength}</td>
                      {/*<td className="loan-table-small__table-cell">N/A</td>*/}
                      <td className="loan-table-small__table-cell">{termLength + " " + row.dharmaDebtOrder.amortizationUnit}</td>
                      <td className="loan-table-small__table-cell">{repayment.toFixed(2)} {row.dharmaDebtOrder.principalTokenSymbol}</td>
                      <td className="loan-table-small__table-cell">
                          <button className="loan-request-fund" disabled={row.isProcessing} onClick={fundFunction.bind(this, row)}>FUND</button>
                      </td>
                  </tr>
              );
    });
}

function LoanRequestsTable(props) {
    return (
        <div className="loan-table">
            <div className="loan-table-header">
                {props.header}
            </div>
            <table className="loan-table-small__table loan-table-stripe">
                <thead>
                <tr className="loan-table-headers">
                    <th className="loan-table-small__table-header">Date created/Expiration date</th>
                    <th className="loan-table-small__table-header">Principal loan amount</th>
                    <th className="loan-table-small__table-header">Interest rate (annual)</th>
                    <th className="loan-table-small__table-header">Term (days)</th>
                    {/*<th className="loan-table-small__table-header">Collateral name and amount</th>*/}
                    <th className="loan-table-small__table-header">Amortization frequency</th>
                    <th className="loan-table-small__table-header">Repayment amount</th>
                    <th className="loan-table-small__table-header"></th>
                </tr>
                </thead>
                <tbody>
                    {renderRows(props.rows, props.onFundClick)}
                </tbody>
            </table>
        </div>
    );
}

export default LoanRequestsTable;