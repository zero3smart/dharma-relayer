import React from "react"
import { Modal, ModalBody } from "../../components/modal/modal"
import { SUPPORTED_TOKENS } from "../../common/api/config";
import "./repay-modal.css"
import { connect } from "react-redux";
import { selectCurrency, getWalletInfo } from '../../actions';
import Spinner from "../../components/spinner/spinner"
import { getRemainingRepaymentValue } from "../../common/services/dharmaService";
import { formatLoanscanLink } from '../../common/services/utilities';
import { SHOW_LOANSCAN_LINK } from '../../common/api/config';

const initialState = {
    amount: "",
    owe: ""
};

let timer = null;

let startTimer = (func) => {
    timer = setTimeout(() => {
        func();
        startTimer(func);
    }, 5000)
};

class RepayLoanModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }


    componentDidMount() {
        this.props.getWalletInfo();
        this.updateYourOwe();
        startTimer(this.updateYourOwe);
    }

    componentWillUnmount() {
        timer && clearTimeout(timer);
    }

    updateYourOwe = () => {
        getRemainingRepaymentValue(this.props.loan)
            .then(res => {
                const owe = res.toFormat(5);
                this.setState({
                    owe: `${owe} ${this.props.loan.principalTokenSymbol}`
                })
            })
    };

    getFormattedIssuanceHash = issuanceHash =>
        `${issuanceHash.substr(0, 5)}...${issuanceHash.substr(-5)}`;

    onAmountChange = ({ target }) => {
        this.setState({ amount: target.value })
    };

    onTokenChange = ({ target }) => {
        this.setState({ token: target.value });
        this.props.selectCurrency(target.value)
    };

    handleRepay = () => {
        this.props.onRepay({
            issuanceHash: this.props.loan.issuanceHash,
            token: this.props.loan.principalTokenSymbol,
            ...this.state,
        })
    };

    onClose = () => {
        this.setState(initialState);
        this.props.handleClose();
    };

    renderFirstStep() {
        const { loan, isLoading } = this.props;

        return (
            <div className="confirm">
                <div className="confirm__row">
                    <div className="confirm__header">
                        <h1>Make Repayment</h1>
                    </div>
                </div>
                <div className="confirm__row">
                    <div>
                        You are making a repayment for debt agreement
            {
                            SHOW_LOANSCAN_LINK ?
                                <a href={formatLoanscanLink(loan.issuanceHash)} target="_blank"> {loan.issuanceHash && this.getFormattedIssuanceHash(loan.issuanceHash)}</a> :
                                <strong> {loan.issuanceHash && this.getFormattedIssuanceHash(loan.issuanceHash)}</strong>
                        }.
          </div>
                    <div>
                        You owe: {!this.state.owe ? <Spinner size="5px" class="inline" /> : <strong>{this.state.owe}</strong>}
                    </div>
                    <div>
                        How large of repayment would you like to make?
          </div>
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
                            onClick={this.onClose}
                        >
                            CANCEL
            </button>
                        <button
                            className={`confirm__btn confirm__btn_confirm ${!this.state.amount ? "disabled" : ""}`}
                            disabled={!this.state.amount}
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
        );
    }

    renderSecondStep() {
        return (
            <div>
                <div className="confirm">
                    <div className="confirm__row">
                        <div className="confirm__header"><h5>Successfully made repayment of {this.state.amount} MKR</h5></div>
                    </div>
                    <div className="confirm__buttons">
                        <div className="confirm__btn-wrapper confirm__btn-wrapper_centered">
                            <button
                                className="confirm__btn confirm__btn_confirm"
                                onClick={this.onClose}>
                                OK
              </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { repayLoanComplete } = this.props;

        if (repayLoanComplete && this.state.amount) {
            return this.renderSecondStep();
        }

        return this.renderFirstStep();
    }
}

const mapStateToProps = ({ walletInfo }) => ({ ...walletInfo });

const mapDispatchToProps = { selectCurrency, getWalletInfo };

export default connect(mapStateToProps, mapDispatchToProps)(RepayLoanModal)