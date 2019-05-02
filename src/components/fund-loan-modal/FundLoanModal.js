import React from "react"
import { connect } from 'react-redux';
import { Modal, ModalBody } from '../modal/modal';
import ConfirmFund from '../confirm-fund/confirm-fund';
import UnlockLendingToken from '../unlock-lending-token/unlock-lending-token.js';
import FillLoanSuccess from '../fill-loan-success/fill-loan-success.js';
import WizardSteps from '../wizard-steps/wizard-steps.js';
import {
  fillLoanRequest,
  lockToken,
  unlockToken,
  getTokenBalance,
  changeFundConfirmationStep,
  hideFundConfirmation,
  runGlobalUpdate
} from "../../actions";

class FundLoanModal extends React.Component {
  constructor(props){
    super(props);
  }

  cancelLoanRequest = () => {
    this.props.hideFundConfirmation();
  };

  renderWizardWithUnlockStep = (currentStepNumber) => (
    <WizardSteps
      steps={['Unlock', 'Review', 'Success']}
      currentStep={currentStepNumber}
    />
  );

  fillLoanRequestHandler = (debtOrder) => {
    let { fillLoanRequest, runGlobalUpdate, changeStep, fundConfirmation:{ stepNumber }, getTokenBalance } = this.props;
    fillLoanRequest(debtOrder, () => {
      changeStep(stepNumber + 1);
      runGlobalUpdate();
      getTokenBalance(debtOrder.dharmaDebtOrder.principalTokenSymbol);
    });
  };

  modalClosed(){
    this.props.hideFundConfirmation();
  }

  render() {
    const {
      fundConfirmation,
      fillLoan,
      changeStep,
      unlockToken
    } = this.props;

    let renderUnlockStep = false;
    let renderReviewStep = false;
    let renderFinalStep = false;
    if (fundConfirmation.modalVisible) {
      renderUnlockStep = fundConfirmation.stepNumber === 1;
      renderReviewStep = fundConfirmation.stepNumber === 2;
      renderFinalStep = fundConfirmation.stepNumber === 3;
    }

    return (
      <Modal show={fundConfirmation.modalVisible} size="md" onModalClosed={this.modalClosed.bind(this)}>
        <div className="loan-request-form__wizard-wrapper">
          {this.renderWizardWithUnlockStep(fundConfirmation.stepNumber)}
        </div>

        <ModalBody>
          {
            renderUnlockStep &&
            <UnlockLendingToken
              lendType={fundConfirmation.loanRequest.dharmaDebtOrder.principalTokenSymbol}
              lendAmount={fundConfirmation.loanRequest.dharmaDebtOrder.principalAmount}
              lendTokenUnlocked={fundConfirmation.lendTokenUnlocked}
              unlockInProgress={fundConfirmation.unlockInProgress}
              onCancel={this.cancelLoanRequest}
              onConfirm={() => changeStep(2)}
              unlockToken={unlockToken}/>
          }
          {
            renderReviewStep &&
            <ConfirmFund
              loanRequest = {fundConfirmation.loanRequest}
              onCancel={() => {
                changeStep(1)
              }}
              onConfirm={this.fillLoanRequestHandler}
              isLoading={fillLoan.isLoading}/>
          }
          {
            renderFinalStep &&
            <FillLoanSuccess
              loanRequest = {fundConfirmation.loanRequest}
              onConfirm={this.cancelLoanRequest}/>
          }
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  fundConfirmation: state.fundConfirmation,
  fillLoan: state.fillLoan
});

const mapDispatchToProps = (dispatch) => ({
  fillLoanRequest(order, callback) {
    dispatch(fillLoanRequest(order, callback))
  },
  hideFundConfirmation() {
    dispatch(hideFundConfirmation());
  },
  changeStep(step){
    dispatch(changeFundConfirmationStep(step));
  },
  runGlobalUpdate() {
    dispatch(runGlobalUpdate());
  },
  getTokenBalance(token) {
    dispatch(getTokenBalance(token));
  },
  unlockToken(token, unlock){
    if (unlock) {
      dispatch(unlockToken(token))
    }
    else {
      dispatch(lockToken(token))
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FundLoanModal)