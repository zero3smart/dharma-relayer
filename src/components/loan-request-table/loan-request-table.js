import React from 'react';
import './loan-request-table.css';

function renderRows(rows, loans, fundFunction) {
    let i = 0;
    return rows.map(row => {
        return (
            <tr key={i}>
                <td className="loan-table-small__table-cell">{row.date}</td>
                <td className="loan-table-small__table-cell">{row.amount} {row.token}</td>
                <td className="loan-table-small__table-cell">{row.interest}</td>
                <td className="loan-table-small__table-cell">{row.term}</td>
                {/*<td className="loan-table-small__table-cell">N/A</td>*/}
              <td className="loan-table-small__table-cell">{row.amortization}</td>
                <td className="loan-table-small__table-cell">{row.repayment.toFixed(2)} {row.token}</td>
                <td className="loan-table-small__table-cell">
                    <button className={"loan-request-fund " + (row.isLoading && "loan-request-fund_disabled")} disabled={row.isLoading} onClick={fundFunction.bind(this, loans[i++])}>FUND</button>
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
                    <th className="loan-table-small__table-header">Interest rate</th>
                    <th className="loan-table-small__table-header">Term</th>
                    {/*<th className="loan-table-small__table-header">Collateral name and amount</th>*/}
                    <th className="loan-table-small__table-header">Amortization frequency</th>
                    <th className="loan-table-small__table-header">Repayment amount</th>
                    <th className="loan-table-small__table-header"></th>
                </tr>
                </thead>
                <tbody>
                    {renderRows(props.rows, props.loans, props.onFundClick)}
                </tbody>
            </table>
        </div>
    );
}

export default LoanRequestsTable;