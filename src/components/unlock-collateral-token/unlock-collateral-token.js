import React, { Component } from 'react';
import { calculateNumberOfPayments, calculateRepaymentAmount, calculateTotalPaymentAmount, isFloat } from '../../common/services/utilities';
import Confirm from '../confirm/confirm';
import './unlock-collateral-token.css';
import Slider from '../slider/slider.js';

class UnlockCollateralToken extends Component {

    onToggleChange(e) {
        let unlockValue = e.target.checked;
        let { collateralType, unlockCollateralToken, collateralAmount } = this.props;
        unlockCollateralToken(collateralType, collateralAmount, unlockValue);
    }

    render() {
        let { onConfirm, onCancel, collateralTokenUnlocked, unlockInProgress, collateralType } = this.props;

        return (
            <div className="unlock-tokens">
                <Confirm
                    header="Unlock tokens"
                    confirmText="NEXT"
                    confirmDisabled={!collateralTokenUnlocked}
                    cancelText="CANCEL"
                    onConfirm={() => onConfirm()}
                    onCancel={onCancel}>

                    <ul className="unlock-tokens__list">
                        <li>Borrowers who provide collateral are required to give smart contracts permission to transfer tokens when debt order is filled.</li>
                        <li>Borrowers have to unlock their tokens to allow use of collateral. To unlock your tokens click the toggle below.</li>
                    </ul>

                    <div className="unlock-tokens__toggle-row">
                        <div className="unlock-tokens__toggle-wrapper">
                            <Slider on={collateralTokenUnlocked} onChange={this.onToggleChange.bind(this)} loading={unlockInProgress} />
                        </div>
                        <div className="unlock-tokens__toggle-label">
                            Toggle to unlock {collateralType} tokens you are using as collateral.
            </div>
                    </div>

                </Confirm>
            </div>
        );
    }
}


export default UnlockCollateralToken;