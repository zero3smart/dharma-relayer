import React from "react"
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Modal, ModalBody } from '../modal/modal';
import ConfirmFund from '../confirm-fund/confirm-fund';
import UnlockLendingToken from '../unlock-lending-token/unlock-lending-token.js';
import FillLoanSuccess from '../fill-loan-success/fill-loan-success.js';
import WizardSteps from '../wizard-steps/wizard-steps.js';
import {
  fillLoanRequest,
  lockToken,
  unlockToken,
  getTokenLock,
  changeFundConfirmationStep,
  showFundConfirmation,
  hideFundConfirmation,
  runGlobalUpdate,
  FILL_LOAN_SUCCESS,
  FILL_LOAN_FAIL
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

  fillLoanRequestHandler = (values) => {
    const { fillLoanRequest, runGlobalUpdate, changeStep, fundConfirmation:{ stepNumber } } = this.props;
    fillLoanRequest(values, () => {
      changeStep(stepNumber + 1);
      runGlobalUpdate();
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
      unlockToken,
      getTokenLock,
      hideFundConfirmation
    } = this.props;

    console.log(fundConfirmation);

    let renderUnlockStep = false;
    let renderReviewStep = false;
    let renderFinalStep = false;
    if (fundConfirmation.modalVisible) {
      renderUnlockStep = fundConfirmation.stepNumber === 1;
      renderReviewStep = fundConfirmation.stepNumber === 2;
      renderFinalStep = fundConfirmation.stepNumber === 3;
    }

    // fundConfirmation.loanRequest && getTokenLock(fundConfirmation.loanRequest.dharmaDebtOrder.principalTokenSymbol);

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
  // showFundConfirmation() {
  //   dispatch(showFundConfirmation());
  // },
  hideFundConfirmation() {
    dispatch(hideFundConfirmation());
  },
  changeStep(step){
    dispatch(changeFundConfirmationStep(step));
  },
  runGlobalUpdate() {
    dispatch(runGlobalUpdate());
  },
  unlockToken(token, unlock){
    if (unlock) {
      dispatch(unlockToken(token))
    }
    else {
      dispatch(lockToken(token))
    }
  },
  getTokenLock(token){
    dispatch(getTokenLock(token))
  },
  fillLoanRequestSuccess() {
    dispatch({
      type: FILL_LOAN_SUCCESS
    });
  },
  fillLoanRequestFail() {
    dispatch({
      type: FILL_LOAN_FAIL
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FundLoanModal)