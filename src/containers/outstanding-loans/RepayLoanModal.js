import React from "react"
import { Modal, ModalBody } from "../../components/modal/modal"
import { SUPPORTED_TOKENS } from "../../common/api/config";
import "./repay-modal.css"
import { connect } from "react-redux";
import { selectCurrency, getWalletInfo } from '../../actions';
import Spinner from "../../components/spinner/spinner"
import { getRemainingRepaymentValue } from "../../common/services/dharmaService";

const initialState = {
    amount: "",
    owe: "",
}

class RepayLoanModal extends React.Component {
    state = initialState

    componentWillReceiveProps() {
        if (this.props.loan && !this.state.owe) {
            this.updateYourOwe()
        }
    }

    updateYourOwe = () => {
        const { selectedCurrency } = this.props
        getRemainingRepaymentValue(this.props.loan.issuanceHash, selectedCurrency)
            .then(res => {
                this.setState({
                    owe: res.isInteger() ? res.toFormat() : res.toFormat(5)
                })
            })
    }

    getFormattedIssuanceHash = issuanceHash =>
        `${issuanceHash.substr(0, 5)}...${issuanceHash.substr(-5)}`

    onAmountChange = ({ target }) => {
        this.setState({ amount: target.value })
    }

    onTokenChange = ({ target }) => {
        this.setState({ token: target.value })
        this.props.selectCurrency(target.value)
    }

    handleRepay = () => {
        this.props.onRepay({
            issuanceHash: this.props.loan.issuanceHash,
            token: this.props.loan.principalTokenSymbol,
            ...this.state,
        })
    }

    componentDidMount() {
        this.props.getWalletInfo()
    }

    render() {
        const { loan, handleClose, isOpen, isLoading } = this.props

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
                                    You owe: <strong>{this.state.owe}</strong>
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
                                    onChange={this.onAmountChange}
                                />
                                <input type="text"
                                    className="repay-modal-token-symbol"
                                    disabled
                                    defaultValue={loan.principalTokenSymbol}
                                />
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
                                        {
                                            isLoading
                                                ? (
                                                    <div className="confirm-btn-spinner">
                                                        <Spinner size="13px" />
                                                    </div>)
                                                : <span>
                                                    MAKE REPAYMENT
                      </span>
                                        }
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

const mapStateToProps = ({ walletInfo }) => ({ ...walletInfo });

const mapDispatchToProps = { selectCurrency, getWalletInfo };

export default connect(mapStateToProps, mapDispatchToProps)(RepayLoanModal)