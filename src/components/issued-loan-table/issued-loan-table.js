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
                    <th className="loan-table-small__table-header" title="Loan amount">Loan <br/> amount</th>
                    <th className="loan-table-small__table-header" title="Loan amount (days)">Loan term</th>
                    <th className="loan-table-small__table-header" title="Interest rate (per payment period)">Interest rate</th>
                    <th className="loan-table-small__table-header" title="Date loan issued">Date loan issued</th>
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