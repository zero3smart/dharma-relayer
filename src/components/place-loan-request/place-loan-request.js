import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change as changeForm } from 'redux-form';
import './place-loan-request.css';
import { showLoanConfirmation, getCollateralTokenLock } from '../../actions';
import { RELAYER_AMORTIZATION_FREQUENCIES } from '../../common/amortizationFrequencies';
import { SUPPORTED_TOKENS } from '../../common/api/config.js';
import PlaceLoanModal from "./PlaceLoanModal"
import ShareLoanModal from "./ShareLoanModal"
import { convertToRelayer } from "../../utils/relayer-adapter";
import {convertPlexOrder} from '../../common/services/dharmaService';
import { DEFAULT_LOAN_REQUEST, termValues, DAYS, PERIODS } from "./constants";

let floatOnly = (value, size) => {
  if (value === null || value === '' || value === undefined) {
    return ''
  }
  if (size === undefined) size = 6;
  let v = value.toString().replace(/[^\d.]/g, '');
  v = v.slice(0, v.indexOf('.') >= 0 ? v.indexOf('.') + size : undefined);
  return v;
};

const floatOnlyPct = (value) => floatOnly(value, 3);
const floatOnlyNum = (value) => floatOnly(value, 6);

const required = value => (!value);


const getAmortizationPeriodByFrequency = amortizationFrequency =>
  PERIODS.find(period => period.value === amortizationFrequency);

const getAmortizationPeriodByUnit = amortizationUnit =>
  PERIODS.find(period => period.dharmaUnit === amortizationUnit)

const initialState = {
  isShareLoanModalOpen: false,
  relayer: null,
  isShareLoanRequest: false,
}

class PlaceLoanRequest extends Component {

  constructor(props) {
    super(props);

    this.renderCurrencyOptions = this.renderCurrencyOptions.bind(this);
  }

  state = initialState

  placeLoanRequestClick = (values) => {
    const amortizationPeriod = getAmortizationPeriodByFrequency(values.amortizationFrequency)
    this.props.showLoanConfirmation({
      ...values,
      amortizationFrequency: values.amortizationFrequency || termValues[values.term].amortizationFrequencies[0],
      amortizationUnit: amortizationPeriod && amortizationPeriod.dharmaUnit
    });
  }

  renderCurrencyOptions() {
    return SUPPORTED_TOKENS.map(symbol => {
      return (<option key={symbol} value={symbol}>{symbol}</option>);
    });
  }

  termChange({ target }, newValue) {
    this.props.changeAmortizationFrequency(target.value);
  }

  openShareModal = () =>
    this.setState({ isShareLoanModalOpen: true })

  closeShareModal = () =>
    this.setState({ isShareLoanModalOpen: false })

  handleSignedLoanRequest = () =>
    this.openShareModal()

  submitShareLoan = (json) => {
    if (json) {
      convertPlexOrder(JSON.parse(json)).then(
        relayerOrder => {
          this.closeShareModal();
          this.setState({ relayer: relayerOrder, isShareLoanRequest: true });

          let relayerOrderInfo = {
            amount: relayerOrder.principalAmount.toNumber(),
            currency: relayerOrder.principalTokenSymbol,
            amortizationUnit: relayerOrder.amortizationUnit,
            amortizationFrequency: getAmortizationPeriodByUnit(relayerOrder.amortizationUnit).value,
            interestRate: relayerOrder.interestRate.toNumber(),
            term: relayerOrder.termLength.toNumber()
          };
          if(relayerOrder.collateralAmount){
            relayerOrderInfo.collateralAmount = relayerOrder.collateralAmount.toNumber();
            relayerOrderInfo.collateralType = relayerOrder.collateralTokenSymbol;
          }
          this.placeLoanRequestClick(relayerOrderInfo);
        }
      ).catch(err => alert(err));
    }
  };

  clearState = () => this.setState(initialState)

  render() {
    const { handleSubmit, valid, amortizationFrequency } = this.props;

    return (
      <div className="loan-request-form">
        <div className="loan-request-form__header">
          New loan request <br/>
          <a
            className="loan-request-link"
            href="javascript:void(0)"
            onClick={this.handleSignedLoanRequest}
          >
            Already have signed loan request?
          </a>
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
              normalize={floatOnlyNum}/>
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
          <div className="loan-request-form__row loan-request-amount loan-request-input-wrapper">
            <Field name="term" className="loan-request-form__select loan-request-select-wrapper" component="select">
              {
                DAYS.map(day => <option key={day} value={day}>{day}</option>)
              }
            </Field>
            <Field name="term_period"
                   className="loan-request-form__select"
                   component="select"
                   onChange={this.termChange.bind(this)}>
              {
                PERIODS.map(({ title, value }) => <option key={title} value={value}>{title}</option>)
              }
            </Field>
          </div>
        </div>
        <div className="loan-request-form__row">
          <div className="loan-request-form__label-wrapper">
            <label className="loan-request-form__label">Payment</label>
          </div>
          <div className="loan-request-form__input-wrapper">
            <input disabled value={amortizationFrequency || ""} className="loan-request-form__input" />
          </div>
        </div>
        <div className="loan-request-form__row">
          <div className="loan-request-form__label-wrapper">
            <label className="loan-request-form__label">Interest</label>
          </div>
          <div className="loan-request-form__input-wrapper">
            <Field
              name="interestRate"
              className="loan-request-form__input"
              placeholder="per loan term, %"
              component="input"
              validate={required}
              normalize={floatOnlyPct}/>
          </div>
        </div>

        <div className="loan-request-form__row loan-request-amount">
          <div className="loan-request-form__label-title">
            <label className="loan-request-form__label loan-request-form__label_collateral">Collateral
              (optional)</label>
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
              normalize={floatOnlyNum}/>
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
            onClick={handleSubmit(this.placeLoanRequestClick)}>
            PLACE LOAN REQUEST
          </button>
        </div>
        <PlaceLoanModal
          relayer={this.state.relayer}
          isShareLoanRequest={this.state.isShareLoanRequest}
          onRelayerSubmit={this.clearState}
        />
        <ShareLoanModal
          isOpen={this.state.isShareLoanModalOpen}
          handleClose={this.closeShareModal}
          onSubmit={this.submitShareLoan}
        />
      </div>
    );
  }
}

const selector = formValueSelector('LoanRequestForm');

const mapStateToProps = state => ({
  amortizationFrequency: selector(state, 'amortizationFrequency'),
});

const mapDispatchToProps = (dispatch) => ({
  changeAmortizationFrequency(value) {
    dispatch(changeForm('LoanRequestForm', 'amortizationFrequency', value))
  },
  showLoanConfirmation(debtOrder) {
    dispatch(showLoanConfirmation(debtOrder));
    if(debtOrder.collateralAmount){
      dispatch(getCollateralTokenLock(debtOrder.collateralType));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'LoanRequestForm',
  initialValues: {
    interestRate: 1,
    term: 7,
    amortizationFrequency: RELAYER_AMORTIZATION_FREQUENCIES["HOURLY"],
    currency: SUPPORTED_TOKENS[0],
    collateralType: SUPPORTED_TOKENS[0]
  }
})(PlaceLoanRequest));