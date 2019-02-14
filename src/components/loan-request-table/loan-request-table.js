import React from 'react';
import './loan-request-table.css';
import {calculateRepaymentAmount, calculateTermInDays, convertToRelayerAmortizationFrequency} from '../../common/services/utilities';

function renderRows(rows, fundFunction) {
  let i = 0;

  return rows
      .map(row => ({...row, creationTimeParsed: new Date(row.creationTime)}))
      .sort((a,b) => a.creationTimeParsed < b.creationTimeParsed ? 1 : (-1))
          .map(row => {
              let termLength = row.dharmaDebtOrder.termLength.toNumber();
              let interestRate = row.dharmaDebtOrder.interestRate.toNumber();
              let repayment = calculateRepaymentAmount(row.dharmaDebtOrder.principalAmount.toNumber(), interestRate);
              let termInDays = calculateTermInDays(row.dharmaDebtOrder.amortizationUnit, termLength);
              let paymentPeriodFrequency = convertToRelayerAmortizationFrequency(row.dharmaDebtOrder.amortizationUnit);

              return (
                  <tr key={i++}>
                      <td className="loan-table-small__table-cell">{row.creationTimeParsed.toLocaleDateString() + " " + row.creationTimeParsed.toLocaleTimeString()}</td>
                      <td className="loan-table-small__table-cell">{row.principalAmount} {row.dharmaDebtOrder.principalTokenSymbol}</td>
                      <td className="loan-table-small__table-cell">{interestRate + '%'}</td>
                      <td className="loan-table-small__table-cell">{termInDays}</td>
                      {/*<td className="loan-table-small__table-cell">N/A</td>*/}
                      <td className="loan-table-small__table-cell">{paymentPeriodFrequency}</td>
                      <td className="loan-table-small__table-cell">{repayment.toFixed(2)} {row.dharmaDebtOrder.principalTokenSymbol}</td>
                      <td className="loan-table-small__table-cell">
                          <button className={"loan-request-fund " + (row.isLoading && "loan-request-fund_disabled")} disabled={row.isLoading} onClick={fundFunction.bind(this, row)}>FUND</button>
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
                    <th className="loan-table-small__table-header">Date created</th>
                    <th className="loan-table-small__table-header">Loan amount</th>
                    <th className="loan-table-small__table-header">Interest rate</th>
                    <th className="loan-table-small__table-header">Term (days)</th>
                    {/*<th className="loan-table-small__table-header">Collateral name and amount</th>*/}
                    <th className="loan-table-small__table-header">Payment period frequency</th>
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