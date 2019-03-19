import React, { Component } from 'react';
import '../confirm/confirm.css';

class PlaceLoanSuccess extends Component {
    render() {
        let { onConfirm, withCollateral } = this.props;

        return (
            <div>
                <div className="confirm">
                    <div className="confirm__row">
                        <h5 className="confirm__header">Loan request was successfully added to the order book.</h5>
                    </div>
                    <p>{`Your requested tokens will arrive to your wallet ${withCollateral ? 'and the collateral tokens will be removed from your wallet ' : ''}once the loan is funded.`}</p>
                    <div className="confirm__buttons">
                        <div className="confirm__btn-wrapper confirm__btn-wrapper_centered">
                            <button
                                className="confirm__btn confirm__btn_confirm"
                                onClick={() => onConfirm && onConfirm()}>
                                OK
              </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default PlaceLoanSuccess;