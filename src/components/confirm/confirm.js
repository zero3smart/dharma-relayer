import React, { Component } from 'react';
import Spinner from '../spinner/spinner';
import './confirm.css';

class Confirm extends Component {
    render() {
        let { header, confirmText, cancelText, onConfirm, onCancel, isLoading, confirmDisabled } = this.props;

        return (
            <div className="confirm">
                <div className="confirm__row">
                    <div className="confirm__header"><h5>{header}</h5></div>
                </div>
                {this.props.children}
                <div className="confirm__buttons">
                    {isLoading ? <Spinner /> :
                        <div className="confirm__btn-wrapper">
                            <button
                                className={"confirm__btn confirm__btn_confirm " + (confirmDisabled ? "confirm__btn_disabled" : "")}
                                disabled={confirmDisabled}
                                onClick={() => onConfirm && onConfirm()}>
                                {confirmText}
                            </button>
                            <button
                                className="confirm__btn confirm__btn_cancel"
                                onClick={() => onCancel && onCancel()}>
                                {cancelText}
                            </button>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Confirm;