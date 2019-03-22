import React from "react"
import { Modal, ModalBody } from "../../components/modal/modal"
import { SUPPORTED_TOKENS } from "../../common/api/config";
import "./repay-modal.css"

const initialState = {
    amount: "",
    token: SUPPORTED_TOKENS[0]
}

class RepayLoanModal extends React.Component {
    state = initialState

    getFormattedIssuanceHash = issuanceHash =>
        `${issuanceHash.substr(0, 5)}...${issuanceHash.substr(-5)}`

    onChange = ({ target }) =>
        this.setState({ [target.name]: target.value })

    handleRepay = () => {
        this.props.onRepay({
            issuanceHash: this.props.loan.issuanceHash,
            ...this.state,
        })
        this.setState(initialState)
    }

    render() {
        const { loan, handleClose, isOpen } = this.props

        return (
            <Modal show={isOpen} size="md" onModalClosed={handleClose}>
                {
                    loan &&
                    <ModalBody>
                        <div className="confirm">
                            <div className="confirm__row">
                                <div className="confirm__header">
                                    <h1>Make Repayment</h1>
                                </div>
                            </div>
                            <div className="confirm__row">
                                <p>
                                    You are making a repayment for debt agreement
                                    <strong> {loan.issuanceHash && this.getFormattedIssuanceHash(loan.issuanceHash)}</strong>.
                                </p>
                                <p>
                                    You owe
                                </p>
                                <p>
                                    How large of repayment would you like to make?
                                </p>
                            </div>
                            <br />
                            <div className="confirm__row">
                                <input
                                    type="text"
                                    placeholder="Amount (e.g. 12.32)"
                                    name="amount"
                                    value={this.state.amount}
                                    onChange={this.onChange}
                                />
                                <select name="token" onChange={this.onChange}>
                                    {
                                        SUPPORTED_TOKENS.map(token =>
                                            <option key={token} value={token}>{token}</option>)
                                    }
                                </select>
                            </div>
                            <div className="confirm__buttons">
                                <div className="confirm__btn-wrapper">
                                    <button
                                        className="confirm__btn confirm__btn_cancel"
                                        onClick={handleClose}
                                    >
                                        CANCEL
                                    </button>
                                    <button
                                        className={`confirm__btn confirm__btn_confirm ${!this.state.amount ? "disabled" : ""}`}
                                        onClick={this.handleRepay}
                                    >
                                        MAKE REPAYMENT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                }
            </Modal>
        )
    }
}

export default RepayLoanModal