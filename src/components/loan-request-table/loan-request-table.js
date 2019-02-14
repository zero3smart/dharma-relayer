import React from 'react';
import './loan-request-table.css';
import {calculateRepaymentAmount, calculateTermInDays, convertToRelayerAmortizationFrequency, isFloat} from '../../common/services/utilities';

function renderRows(rows, fundFunction) {
  let i = 0;

  return rows
      .map(row => ({...row, creationTimeParsed: new Date(row.creationTime)}))
      .sort((a,b) => a.creationTimeParsed < b.creationTimeParsed ? 1 : (-1))
          .map(row => {
              let termLength = row.dharmaDebtOrder.termLength.toNumber();
              let interestRate = row.dharmaDebtOrder.interestRate.toNumber();
              let amount = row.dharmaDebtOrder.principalAmount.toNumber();
              let repayment = calculateRepaymentAmount(amount, interestRate);
              let termInDays = calculateTermInDays(row.dharmaDebtOrder.amortizationUnit, termLength);
              let paymentPeriodFrequency = convertToRelayerAmortizationFrequency(row.dharmaDebtOrder.amortizationUnit);
              let repaymentString = isFloat(repayment) ? repayment.toFixed(2) : repayment;
              let amountString = isFloat(amount) ? amount.toFixed(2) : amount;

              return (
                  <tr key={i++}>
                      <td className="loan-table__table-cell">{row.creationTimeParsed.toLocaleDateString()} {row.creationTimeParsed.toLocaleTimeString()}</td>
                      <td className="loan-table__table-cell text-right">{amountString} {row.dharmaDebtOrder.principalTokenSymbol}</td>
                      <td className="loan-table__table-cell text-right">{termInDays} days</td>
                      <td className="loan-table__table-cell text-right">{repaymentString} {row.dharmaDebtOrder.principalTokenSymbol}</td>
                      <td className="loan-table__table-cell text-right">{interestRate + '%'}</td>
                      {/*<td className="loan-table__table-cell">N/A</td>*/}
                      <td className="loan-table__table-cell">{paymentPeriodFrequency}</td>
                      <td className="loan-table__table-cell">
                          <button className={"loan-request-fund " + (row.isLoading && "loan-request-fund_disabled")} disabled={row.isLoading} onClick={fundFunction.bind(this, row)}>FUND</button>
                      </td>
                  </tr>
              );
    });
}

function LoanRequestsTable(props) {
    return (
        <div className="loan-table scrollable-table">
            <div className="loan-table__header">
                {props.header}
            </div>
            <table className="loan-table__table loan-table__stripe">
                <thead>
                <tr className="loan-table__headers">
                    <th className="loan-table__table-header" title="Created">Created</th>
                    <th className="loan-table__table-header text-right" title="Amount">Amount</th>
                    <th className="loan-table__table-header text-right" title="Term">Term</th>
                    <th className="loan-table__table-header text-right" title="Total repayment">Total repayment</th>
                    <th className="loan-table__table-header text-right" title="Interest per  repayment">Interest per  repayment</th>
                    {/*<th className="loan-table__table-header">Collateral name and amount</th>*/}
                    <th className="loan-table__table-header" title="Repayment frequency">Repayment frequency</th>
                    <th className="loan-table__table-header"></th>
                </tr>
                </thead>
                <tbody className="loan-table__table-body scrollable-table__table-body scrollable">
                    {renderRows(props.rows, props.onFundClick)}
                </tbody>
            </table>
        </div>
    );
}

export default LoanRequestsTable;