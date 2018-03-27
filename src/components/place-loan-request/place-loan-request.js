import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector } from 'redux-form';
import './place-loan-request.css';
import {allowCollateral} from '../../actions';

const termValues = {
  30: '30 days',
  60: '60 days',
  90: '90 days'
};

const numberOnly = (value) => {
  let parsed = Number.parseInt(value);
  return isNaN(parsed) ? null : parsed;
};
const floatOnly = (value) => {
  //let parsed = Number.parseFloat(value);
  //return isNaN(parsed) ? null : (value.endsWith('.') ? value : parsed) ;

  if (value === null || value === '' || value === undefined) { return '' }
  let v = value.toString().replace(/[^\d.]/g, '')
  v = v.slice(0, v.indexOf('.') >= 0 ? v.indexOf('.') + 3 : undefined)
  return v
};
const required = value => (value ? false : true);

class PlaceLoanRequest extends Component{
  allowCollateralUseClick(amount){
    this.props.allowCollateral(amount);
  }

  render(){
    const { handleSubmit } = this.props;

    return (
      <div className="loan-request-form">
        <div className="loan-request-form__row">
          <div className="loan-request-form__input-wrapper">
            <Field
              name="amount"
              className="loan-request-form__input"
              placeholder="Amount"
              component="input"
              validate={required}
              normalize={numberOnly}/>
          </div>
          <div className="loan-request-form__select-wrapper">
            <Field name="currency" className="loan-request-form__select" component="select">
              <option>ETH</option>
              <option>USD</option>
            </Field>
          </div>
        </div>
        <div className="loan-request-form__row">
          <div className="loan-request-form__label-wrapper">
            Term
          </div>
          <div className="loan-request-form__select-wrapper">
            <Field name="term" className="loan-request-form__select" component="select">
              <option value="30" selected>{termValues['30']}</option>
              <option value="60">{termValues['60']}</option>
              <option value="90">{termValues['90']}</option>
            </Field>
          </div>
        </div>
        <div className="loan-request-form__repayment-frequency">
          <span>Repayment frequency</span>
        </div>
        <div className="loan-request-form__row">
          <div className="loan-request-form__label-wrapper">
            {this.props.term ? termValues[this.props.term] : termValues['30']} loan
          </div>
          <div className="loan-request-form__select-wrapper">
            <select className="loan-request-form__select">
               <option>monthly</option>
               <option>weekly</option>
               <option>daily</option>
            </select>

          </div>
        </div>
        <div className="loan-request-form__row">
          <div className="loan-request-form__input-wrapper">
            <Field
              name="maxInterest"
              className="loan-request-form__input"
              placeholder="Max interest rate (annual)"
              component="input"
              normalize={floatOnly}/>
          </div>
        </div>
        <div className="loan-request-form__row">
          <div className="loan-request-form__label-wrapper">
            Collateral type
          </div>
          <div className="loan-request-form__select-wrapper">
            <select className="loan-request-form__select">
              <option>ETH</option>
              <option>EUR</option>
              <option>USD</option>
            </select>
          </div>
        </div>
        <div className="loan-request-form__row">
          <div className="loan-request-form__collateral-input-wrapper">
            <input value="Collateral value 150%" className="loan-request-form__input"/>
          </div>
          <div className="loan-request-form__collateral-input-wrapper">
            <button
              value="Allow Collateral use"
              className="loan-request-form__collateral-btn"
              onClick={handleSubmit(({amount}) => this.allowCollateralUseClick(amount))}>
              Allow collateral use
            </button>
          </div>
        </div>
        <div className="loan-request-form__relayer-fee">
          <span>Relayer fee 0.00%</span>
        </div>
        <div className="loan-request-form__place-btn-wrapper">
          <button className="loan-request-form__place-btn">
            PLACE LOAN REQUEST
          </button>
        </div>
      </div>
    );
  }
}

const selector = formValueSelector('LoanRequestForm');

let mapStateToProps = state => ({
  amount: selector(state, 'amount'),
  term: selector(state, 'term')
});

let mapDispatchToProps = {allowCollateral};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'LoanRequestForm'})(PlaceLoanRequest));
