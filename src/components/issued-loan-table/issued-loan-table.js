import React, {Component} from 'react';
import './issued-loan-table.css';


function renderRows(rows) {
    let i = 0;
    return rows.map(row => {
        return (
            <tr key={i++}>
                <td className="loan-table-small__table-cell">{row.amount} {row.token}</td>
                <td className="loan-table-small__table-cell">{row.term}</td>
                <td className="loan-table-small__table-cell">{row.interest}</td>
                <td className="loan-table-small__table-cell">{row.date}</td>
            </tr>
        );
    });
}

function IssuedLoanTable(props) {
    return (
        <div className="loan-table">
            <div className="loan-table-header">
                {props.header}
            </div>
            <table className="loan-table-small__table loan-table-stripe">
                <thead>
                <tr className="loan-table-headers">
                    <th className="loan-table-small__table-header">Loan amount and token name</th>
                    <th className="loan-table-small__table-header">Term</th>
                    <th className="loan-table-small__table-header">% (annual)</th>
                    <th className="loan-table-small__table-header">Date and time filled</th>
                </tr>
                </thead>
                <tbody>
                {renderRows(props.rows)}
                </tbody>
            </table>
        </div>
    );
}

export default IssuedLoanTable;