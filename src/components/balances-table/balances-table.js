import React from 'react';
import './balances-table.css';
import Slider from '../slider/slider.js';
import InfoIcon from '../info-icon/info-icon.js';

function handleUnlockChange(assetId, e, callback) {
  let unlockValue = e.target.checked;
  if (callback) {
    callback(assetId, unlockValue);
  }
}

function renderRows(rows, onLockUpdate) {
  return rows.map(row => {

    let amountString;
    if (row.amount) {
      amountString = row.amount.toFormat(3);
    }

    return (
      <tr key={row.id}>
        <td className="balances-table__table-cell">
          <span className="balances-table__asset-id">{row.id}</span>
          <br />
          {row.name}
        </td>
        <td className="balances-table__table-cell">
          <span className="balances-table__balance-value">
            {amountString}
          </span>
        </td>
        <td className="balances-table__table-cell">
          <Slider on={row.unlocked} onChange={e => handleUnlockChange(row.id, e, onLockUpdate)} loading={row.lockProcessing} />
        </td>
      </tr>
    );
  });
}

function renderUnlockedTooltip() {
  return (
    <div className="balances-table__unlocked-tooltip-text">
      <b>Unlocking tokens</b>
      <ul className="balances-table__unlocked-tooltip-list">
        <li>Borrowers have to unlock their tokens to allow tokens transfer if such tokens are designated as collateral.</li>
        <li>Creditors have to unlock their tokens to enable lending of designated tokens.</li>
        <li>To unlock your tokens click the toggle next to the token you would like to lend.</li>
      </ul>
    </div>
  );
}

function BalancesTable(props) {
  return (
    <div className="balances-table scrollable-table">
      <div className="balances-table__header">
        Your Balances
      </div>
      <hr />
      <div className="balances-table__table-wrapper">
        <table className="balances-table__table balances-table__table_stripe">
          <thead>
            <tr>
              <th className="balances-table__table-header" title="Asset">Asset</th>
              <th className="balances-table__table-header" title="Available Balances">Available Balance</th>
              <th className="balances-table__table-header">
                Unlocked
              <div className="balances-table__info-icon-container">
                  <InfoIcon color="#3D4966" renderTooltip={renderUnlockedTooltip} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="balances-table__table-body scrollable-table__table-body scrollable">
            {renderRows(props.data, props.onLockUpdate)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BalancesTable;