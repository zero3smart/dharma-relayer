import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change as changeForm } from 'redux-form';
import './place-loan-request.css';
import {
  placeLoanRequest,
  resetLoanForm,
  hideLoanConfirmation,
  showLoanConfirmation,
  runGlobalUpdate,
  changeDebtOrderConfirmationStep,
  unlockCollateralToken,
  lockCollateralToken
} from '../../actions';
import { RELAYER_AMORTIZATION_FREQUENCIES } from '../../common/amortizationFrequencies';
import { Modal, ModalBody } from '../modal/modal';
import ConfirmLoanRequest from '../confirm-loan-request/confirm-loan-request';
import UnlockCollateralToken from '../unlock-collateral-token/unlock-collateral-token.js';
import PlaceLoanSuccess from '../place-loan-success/place-loan-success.js';
import WizardSteps from '../wizard-steps/wizard-steps.js';
import CheckIcon from '../check-icon/check-icon.js';
import { calculateCollateralAmount } from '../../common/services/utilities';
import { SUPPORTED_TOKENS } from '../../common/api/config.js';

const termValues = {
  1: { name: '1 day', amortizationFrequencies: [RELAYER_AMORTIZATION_FREQUENCIES.DAILY] },
  7: { name: '7 days', amortizationFrequencies: [RELAYER_AMORTIZATION_FREQUENCIES.DAILY] },
  28: { name: '28 days', amortizationFrequencies: [RELAYER_AMORTIZATION_FREQUENCIES.WEEKLY] },
  90: { name: '90 days', amortizationFrequencies: [RELAYER_AMORTIZATION_FREQUENCIES.MONTHLY] },
  180: { name: '180 days', amortizationFrequencies: [RELAYER_AMORTIZATION_FREQUENCIES.MONTHLY] },
  360: { name: '360 days', amortizationFrequencies: [RELAYER_AMORTIZATION_FREQUENCIES.MONTHLY] }
};

const floatOnly = (value) => {
  if (value === null || value === '' || value === undefined) { return '' }
  let v = value.toString().replace(/[^\d.]/g, '')
  v = v.slice(0, v.indexOf('.') >= 0 ? v.indexOf('.') + 6 : undefined)
  return v
};
const required = value => (value ? false : true);

class PlaceLoanRequest extends Component {

  constructor(props) {
    super(props);

    this.reset = this.reset.bind(this);
    this.cancelLoanRequest = this.cancelLoanRequest.bind(this);
    this.renderCurrencyOptions = this.renderCurrencyOptions.bind(this);
    this.placeLoanRequestHandler = this.placeLoanRequestHandler.bind(this);
  }

  placeLoanRequestClick(values) {
    this.props.showLoanConfirmation({
      ...values,
      amortizationFrequency: values.amortizationFrequency || termValues[values.term].amortizationFrequencies[0]
    });
  }

  placeLoanRequestHandler(values) {
    let { placeLoanRequest, runGlobalUpdate, changeStep, debtOrderConfirmation: { stepNumber } } = this.props;
    placeLoanRequest(values, () => {
      changeStep(stepNumber + 1);
      runGlobalUpdate();
    });
  }

  cancelLoanRequest() {
    this.reset();
    this.props.hideLoanConfirmation();
  }

  reset() {
    this.props.reset();
    this.props.resetLoanForm();
  }

  renderAmortizationFrequencySelect(selectedTerm) {
    return (
      <Field name="amortizationFrequency" className="loan-request-form__select" component="select">
        {
          termValues[selectedTerm].amortizationFrequencies.map(freq => {
            return (<option key={freq} value={freq}>{freq}</option>);
          })
        }
      </Field>
    );
  }

  renderCurrencyOptions() {
    return SUPPORTED_TOKENS.map(symbol => {
      return (<option key={symbol} value={symbol}>{symbol}</option>);
    });
  }

  termChange(event, newValue) {
    let newSelectedFrequency = termValues[newValue].amortizationFrequencies[0];
    this.props.changeAmortizationFrequency(newSelectedFrequency);
  }

  renderWizardWithUnlockStep(currentStepNumber) {
    return (
      <WizardSteps steps={['Unlock', 'Review', 'Success']} currentStep={currentStepNumber} />
    );
  }

  renderWizardNoUnockStep(currentStepNumber) {
    return (
      <WizardSteps steps={['Review', 'Success']} currentStep={currentStepNumber} />
    );
  }

  renderModal() {
    const { debtOrderConfirmation, placeLoan, changeStep, unlockCollateralToken, hideLoanConfirmation, collateralType } = this.props;
    let collateralExists = debtOrderConfirmation.collateralAmount > 0;

    let renderUnlockStep = false;
    let renderReviewStep = false;
    let renderFinalStep = false;
    if (debtOrderConfirmation.modalVisible) {
      renderUnlockStep = collateralExists && (debtOrderConfirmation.stepNumber === 1);
      renderReviewStep = (collateralExists && debtOrderConfirmation.stepNumber === 2) || (!collateralExists && debtOrderConfirmation.stepNumber === 1);
      renderFinalStep = (collateralExists && debtOrderConfirmation.stepNumber === 3) || (!collateralExists && debtOrderConfirmation.stepNumber === 2);
    }

    return (
      <Modal show={debtOrderConfirmation.modalVisible} size="md" onModalClosed={hideLoanConfirmation}>
        <div className="loan-request-form__wizard-wrapper">
          {collateralExists ? this.renderWizardWithUnlockStep(debtOrderConfirmation.stepNumber) : this.renderWizardNoUnockStep(debtOrderConfirmation.stepNumber)}
        </div>

        <ModalBody>
          {
            renderUnlockStep &&
            <UnlockCollateralToken
              collateralType={debtOrderConfirmation.collateralType}
              collateralAmount={debtOrderConfirmation.collateralAmount}
              collateralTokenUnlocked={debtOrderConfirmation.collateralTokenUnlocked}
              unlockInProgress={debtOrderConfirmation.unlockInProgress}
              onCancel={this.cancelLoanRequest}
              onConfirm={() => changeStep(2)}
              unlockCollateralToken={unlockCollateralToken} />
          }
          {
            renderReviewStep &&
            <ConfirmLoanRequest
              {...debtOrderConfirmation}
              onCancel={() => { collateralExists ? changeStep(1) : this.cancelLoanRequest() }}
              onConfirm={this.placeLoanRequestHandler}
              isLoading={placeLoan.isLoading} />
          }
          {
            renderFinalStep &&
            <PlaceLoanSuccess
              onConfirm={this.cancelLoanRequest}
              withCollateral={collateralExists} />
          }
        </ModalBody>
      </Modal>
    );
  }

  render() {
    const { handleSubmit, valid, term } = this.props;

    return (
      <div className="loan-request-form">
        <div className="loan-request-form__header">
          New loan request
        </div>
        <div className="loan-request-form__row loan-request-amount">
          <div className="loan-request-form__label-wrapper">
            <label className="loan-request-form__label">Amount</label>
          </div>
          <div className="loan-request-form__input-wrapper">
            <Field
              name="amount"
              className="loan-request-form__input"
              placeholder="0"
              component="input"
              validate={required}
              normalize={floatOnly} />
          </div>
          <div className="loan-request-form__select-wrapper">
            <Field name="currency" className="loan-request-form__select" component="select">
              {this.renderCurrencyOptions()}
            </Field>
          </div>
        </div>
        <div className="loan-request-form__row">
          <div className="loan-request-form__label-wrapper">
            <label className="loan-request-form__label">Term</label>
          </div>
          <div className="loan-request-form__select-wrapper">
            <Field name="term" className="loan-request-form__select" component="select" onChange={this.termChange.bind(this)}>
              <option value="1">{termValues['1'].name}</option>
              <option value="7">{termValues['7'].name}</option>
              <option value="28">{termValues['28'].name}</option>
              <option value="90">{termValues['90'].name}</option>
              <option value="180">{termValues['180'].name}</option>
              <option value="360">{termValues['360'].name}</option>
            </Field>
          </div>
        </div>
        <div className="loan-request-form__row">
          <div className="loan-request-form__label-wrapper">
            <label className="loan-request-form__label">Payment</label>
          </div>
          <div className="loan-request-form__select-wrapper">
            {term && this.renderAmortizationFrequencySelect(term)}
          </div>
        </div>
        <div className="loan-request-form__row">
          <div className="loan-request-form__label-wrapper">
            <label className="loan-request-form__label">Interest</label>
          </div>
          <div className="loan-request-form__input-wrapper">
            <Field
              name="maxInterest"
              className="loan-request-form__input"
              placeholder="per loan term, %"
              component="input"
              validate={required}
              normalize={floatOnly} />
          </div>
        </div>

        <div className="loan-request-form__row loan-request-amount">
          <div className="loan-request-form__label-title">
            <label className="loan-request-form__label loan-request-form__label_collateral">Collateral (optional)</label>
          </div>
        </div>

        <div className="loan-request-form__row loan-request-amount">
          <div className="loan-request-form__label-wrapper">
            <label className="loan-request-form__label">Amount</label>
          </div>
          <div className="loan-request-form__input-wrapper">
            <Field
              name="collateralAmount"
              className="loan-request-form__input"
              placeholder="0"
              component="input"
              normalize={floatOnly} />
          </div>
          <div className="loan-request-form__select-wrapper">
            <Field name="collateralType" className="loan-request-form__select" component="select">
              {this.renderCurrencyOptions()}
            </Field>
          </div>
        </div>
        <div className="loan-request-form__place-btn-wrapper">
          <button
            className={"loan-request-form__place-btn " + (valid ? "" : "loan-request-form_disabled")}
            onClick={handleSubmit(this.placeLoanRequestClick.bind(this))}>
            PLACE LOAN REQUEST
          </button>
        </div>
        {this.renderModal()}
      </div>
    );
  }
}

const selector = formValueSelector('LoanRequestForm');

let mapStateToProps = state => ({
  amount: selector(state, 'amount'),
  term: selector(state, 'term'),
  amortizationFrequency: selector(state, 'amortizationFrequency'),
  debtOrderConfirmation: state.debtOrderConfirmation,
  placeLoan: state.placeLoan
});
let mapDispatchToProps = (dispatch) => ({
  placeLoanRequest(order, callback) {
    dispatch(placeLoanRequest(order, callback))
  },
  changeAmortizationFrequency(value) {
    dispatch(changeForm('LoanRequestForm', 'amortizationFrequency', value))
  },
  resetLoanForm() {
    dispatch(resetLoanForm());
  },
  hideLoanConfirmation() {
    dispatch(hideLoanConfirmation());
  },
  showLoanConfirmation(debtOrder) {
    dispatch(showLoanConfirmation(debtOrder));
  },
  runGlobalUpdate() {
    dispatch(runGlobalUpdate());
  },
  changeStep(step) {
    dispatch(changeDebtOrderConfirmationStep(step));
  },
  unlockCollateralToken(token, amount, unlock) {
    if (unlock) {
      dispatch(unlockCollateralToken(token, amount))
    }
    else {
      dispatch(lockCollateralToken(token, amount))
    }
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'LoanRequestForm',
  initialValues: {
    term: 7,
    currency: SUPPORTED_TOKENS[0],
    collateralType: SUPPORTED_TOKENS[0]
  }
})(PlaceLoanRequest));