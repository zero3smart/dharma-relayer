import React, {Component} from 'react';
import './place-loan-request.css';

class PlaceLoanRequest extends Component{
  render(){
    return (
      <div className="loan-request-form">
        <div className="loan-request-form__row">
          <div className="loan-request-form__input-wrapper">
            <input placeholder="Amount" className="loan-request-form__input"/>
          </div>
          <div className="loan-request-form__select-wrapper">
            <select className="loan-request-form__select">
              <option>ETH</option>
              <option>USD</option>
            </select>
          </div>
        </div>
        <div className="loan-request-form__row">
          <div className="loan-request-form__input-wrapper">
            <input placeholder="Term (days)" className="loan-request-form__input"/>
          </div>
          <div className="loan-request-form__select-wrapper">
            <select className="loan-request-form__select">
              <option>30 days</option>
              <option>60 days</option>
              <option>90 days</option>
            </select>
          </div>
        </div>
        <div className="loan-request-form__repayment-frequency">
          <span>Repayment frequency</span>
        </div>
        <div className="loan-request-form__row">
          <div className="loan-request-form__input-wrapper">
            <input value="90 day loan" className="loan-request-form__input"/>
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
            <input placeholder="Max interest rate (annual)" className="loan-request-form__input"/>
          </div>
        </div>
        <div className="loan-request-form__row">
          <div className="loan-request-form__input-wrapper">
            <input value="Collateral type" className="loan-request-form__input"/>
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
            <button value="Allow Collateral use" className="loan-request-form__collateral-btn">Allow collateral use</button>
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

export default PlaceLoanRequest;
