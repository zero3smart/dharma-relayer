import React from 'react';
import './issued-loan-table.css';
import { formatLoanscanLink } from '../../common/services/utilities';
import BigNumber from 'bignumber.js';
import { SHOW_LOANSCAN_LINK } from '../../common/api/config';

function redirectToLoanscan(issuanceHash){
  window.open(formatLoanscanLink(issuanceHash), "_blank");
}

function renderRows(rows) {
    let i = 0;

    return rows.map(row => {
        const amountString = row.amount.toFormat(3);
        const interestRate = row.interest.toFixed(2);
        const rowIsClickable = SHOW_LOANSCAN_LINK && row.issuanceHash;
        const rowClassName = rowIsClickable ? "issued-table__clickable-row" : "";

        return (
            <tr key={i++} className={rowClassName} onClick={() => {rowIsClickable && redirectToLoanscan(row.issuanceHash)}}>
                <td className="issued-table__table-cell">{row.date}</td>
                <td className="issued-table__table-cell"><strong>{amountString}</strong> {row.token} </td>
                <td className="issued-table__table-cell"><strong>{interestRate}</strong> %</td>
                <td className="issued-table__table-cell"><strong>{row.termLength}</strong> {row.amortizationUnit.slice(0,1)}</td>
            </tr>
        );
    });
}

function IssuedLoanTable(props) {
    return (
        <div className="issued-table scrollable-table">
            <div className="loan-table__header issued-table__header">
                {props.header}
            </div>
            <table className="issued-table__table issued-table_stripe">
                <thead>
                    <tr className="issued-table__headers">
                        <th className="issued-table__table-header" title="Date loan issued">Date</th>
                        <th className="issued-table__table-header" title="Loan amount">Amount</th>
                        <th className="issued-table__table-header" title="Interest rate per loan term">Interest</th>
                        <th className="issued-table__table-header" title="Loan term">Term</th>
                    </tr>
                </thead>
                <tbody className="issued-table__table-body scrollable-table__table-body scrollable">
                    {renderRows(props.rows)}
                </tbody>
            </table>
        </div>
    );
}

export default IssuedLoanTable;