import React, {Component} from 'react';
import './wallet-info.css';
import * as CurrencyCodes from '../../common/currencyCodes';
import {isFloat} from '../../common/services/utilities';

let destroyTimer = null;

let startTimer = (func) => {
  destroyTimer = setTimeout(() => {
    func();
    startTimer(func);
  }, 5000)
};

class WalletInfo extends Component{
  constructor(props){
    super(props);

    this.renderCurrencyItem = this.renderCurrencyItem.bind(this);
  }

  componentDidMount(){
    let {getWalletInfo} = this.props;
    getWalletInfo();
    startTimer(getWalletInfo);
  }

  renderCurrencyItem(currency, isActive){
    return (
      <div className={"wallet-info__currency" + (isActive ? " wallet-info__currency_active" : "")}
          onClick={() => {this.props.selectCurrency(currency)}}>
        {currency}
      </div>
    );
  }

  render(){
    let {address, amount, selectedCurrency, isProcessing} = this.props;

    let amountString;
    if(amount){
      let amountNumber = amount.toNumber();
      amountString = (isFloat(amountNumber) ? amountNumber.toFixed(5) : amountNumber);
    }

    return (
      <div className="wallet-info">
        <div className="wallet-info__logo">
        </div>
        <div className="wallet-info__address">
          <p>Ethereum address</p>
          <span>
            {address}
          </span>
        </div>
        <div className="wallet-info__balance-info">
          <p>Balance</p>
          <div>
            <b className={isProcessing ? "wallet-info__balance-hidden" : "wallet-info__balance"} title={`${amountString} ${selectedCurrency}`}>
              {amountString} {selectedCurrency}
            </b>
            <div className="wallet-info__currency-container">
              {this.renderCurrencyItem(CurrencyCodes.ETH, selectedCurrency === CurrencyCodes.ETH)}
              {this.renderCurrencyItem(CurrencyCodes.DAI, selectedCurrency === CurrencyCodes.DAI)}
              {this.renderCurrencyItem(CurrencyCodes.MKR, selectedCurrency === CurrencyCodes.MKR)}
              {this.renderCurrencyItem(CurrencyCodes.REP, selectedCurrency === CurrencyCodes.REP)}
              {this.renderCurrencyItem(CurrencyCodes.ZRX, selectedCurrency === CurrencyCodes.ZRX)}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default WalletInfo;