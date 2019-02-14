import React, {Component} from 'react';
import './issued-loan-table.css';
import {isFloat} from '../../common/services/utilities';


function renderRows(rows) {
    let i = 0;
    return rows.map(row => {
        let amountString = isFloat(row.amount) ? row.amount.toFixed(2) : row.amount;
        return (
            <tr key={i++}>
                <td className="issued-table__table-cell">{amountString} {row.token}</td>
                <td className="issued-table__table-cell">{row.term}</td>
                <td className="issued-table__table-cell">{row.interest}</td>
                <td className="issued-table__table-cell">{row.date}</td>
            </tr>
        );
    });
}

function IssuedLoanTable(props) {
    return (
        <div className="issued-table scrollable-table">
            <div className="issued-table__header">
                {props.header}
            </div>
            <table className="issued-table__table issued-table_stripe">
                <thead>
                <tr className="issued-table__headers">
                    <th className="issued-table__table-header" title="Loan amount">Loan <br/> amount</th>
                    <th className="issued-table__table-header" title="Loan amount (days)">Loan term</th>
                    <th className="issued-table__table-header" title="Interest rate (per payment period)">Interest rate</th>
                    <th className="issued-table__table-header" title="Date loan issued">Date loan issued</th>
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