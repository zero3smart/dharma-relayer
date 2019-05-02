import React from 'react';
import './loan-request-table.css';
import BigNumber from 'bignumber.js';
import { calculateTotalPaymentAmount, convertToRelayerAmortizationFrequency } from '../../common/services/utilities';

function renderCollateral(dharmaDebtOrder) {
  if (dharmaDebtOrder.collateralAmount) {
    const amount = dharmaDebtOrder.collateralAmount;
    let amountString = amount.toFormat(3);
    return (<td className="loan-table__table-cell loan-table__primary-cell text-right">
      <strong>{amountString}</strong> {dharmaDebtOrder.collateralTokenSymbol}
    </td>);
  }

  return (<td className="loan-table__table-cell loan-table__primary-cell text-right">—</td>);
}

function renderRows(rows, fundFunction) {
  let i = 0;

  return rows
    .map(row => ({ ...row, creationTimeParsed: new Date(row.creationTime) }))
    .sort((a, b) => a.creationTimeParsed < b.creationTimeParsed ? 1 : (-1))
    .map(row => {
      let termLength = row.dharmaDebtOrder.termLength.toNumber();
      let interestRate = row.dharmaDebtOrder.interestRate.toFixed(2);
      let amount = row.dharmaDebtOrder.principalAmount;
      let totalRepayment = calculateTotalPaymentAmount(row.dharmaDebtOrder.principalAmount, row.dharmaDebtOrder.interestRate);
      let paymentPeriodFrequency = convertToRelayerAmortizationFrequency(row.dharmaDebtOrder.amortizationUnit);
      let repaymentString = totalRepayment.toFormat(3);
      let amountString = amount.toFormat(3);

      return (
        <tr key={i++}>
          <td className="loan-table__table-cell loan-table__date-cell">{row.creationTimeParsed.toLocaleDateString()} <br/> {row.creationTimeParsed.toLocaleTimeString()}</td>
          <td className="loan-table__table-cell loan-table__primary-cell text-right"><strong>{amountString}</strong> {row.dharmaDebtOrder.principalTokenSymbol}</td>
          <td className="loan-table__table-cell loan-table__primary-cell text-right">
            <strong>{termLength}</strong> {row.dharmaDebtOrder.amortizationUnit}
          </td>
          <td className="loan-table__table-cell loan-table__primary-cell text-right"><strong>{repaymentString}</strong> {row.dharmaDebtOrder.principalTokenSymbol}</td>
          <td className="loan-table__table-cell loan-table__primary-cell text-right"><strong>{interestRate}</strong> %</td>
          {renderCollateral(row.dharmaDebtOrder)}
          <td className="loan-table__table-cell loan-table__small-cell">{paymentPeriodFrequency}</td>
          <td className="loan-table__table-cell loan-table__small-cell">
            <button className={"loan-request-fund " + (row.isLoading && "loan-request-fund_disabled")} disabled={row.isLoading} onClick={fundFunction.bind(this, row)}>FUND</button>
          </td>
        </tr>
      );
    });
}

function LoanRequestsTable(props) {
  return (
    <div className="loan-table scrollable-table">
      <div className="loan-table__nav">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" href="#">{props.header}</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#" title="Coming soon">Secondary trading</a>
          </li>
        </ul>
      </div>
      <table className="loan-table__table loan-table__stripe">
        <thead>
          <tr className="loan-table__headers">
            <th className="loan-table__table-header loan-table__date-cell" title="Created">Created</th>
            <th className="loan-table__table-header text-right" title="Amount">Amount</th>
            <th className="loan-table__table-header text-right" title="Loan term">Loan term</th>
            <th className="loan-table__table-header text-right" title="Total repayment">Total repayment</th>
            <th className="loan-table__table-header text-right" title="Interest rate per loan term">Interest rate per loan term</th>
            <th className="loan-table__table-header text-right">Collateral</th>
            <th className="loan-table__table-header loan-table__small-cell" title="Repayment frequency">Repayment frequency</th>
            <th className="loan-table__table-header loan-table__small-cell"> </th>
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