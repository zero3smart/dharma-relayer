import React, { Component } from 'react';
import Confirm from '../confirm/confirm';
import Slider from '../slider/slider.js';

class UnlockLendingToken extends Component {

  onToggleChange(e) {
    let unlockValue = e.target.checked;
    let { lendType, unlockToken } = this.props;
    unlockToken(lendType, unlockValue);
  }

  render() {
    let { onConfirm, onCancel, lendTokenUnlocked, unlockInProgress, lendType } = this.props;

    return (
      <div className="unlock-tokens">
        <Confirm
          header="Unlock tokens"
          confirmText="NEXT"
          confirmDisabled={!lendTokenUnlocked || unlockInProgress}
          cancelText="CANCEL"
          onConfirm={() => onConfirm()}
          onCancel={onCancel}>

          <ul className="unlock-tokens__list">
            <li>Creditors have to unlock their tokens to enable lending of designated tokens. To unlock your tokens click the toggle below.</li>
          </ul>

          <div className="unlock-tokens__toggle-row">
            <div className="unlock-tokens__toggle-wrapper">
              <Slider on={lendTokenUnlocked} onChange={this.onToggleChange.bind(this)} loading={unlockInProgress} />
            </div>
            <div className="unlock-tokens__toggle-label">
              Toggle to UNLOCK {lendType} tokens you want to lend
            </div>
          </div>

          <ul className="unlock-tokens__list">
            {
              lendTokenUnlocked && !unlockInProgress &&
              <li>Your {lendType} tokens you want to lend are already unlocked. Please click next to continue.</li>
            }
          </ul>

        </Confirm>
      </div>
    );
  }
}


export default UnlockLendingToken;