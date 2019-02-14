import React, {Component} from 'react';
import './wallet-info.css';
import * as CurrencyCodes from '../../common/currencyCodes';

let destroyTimer = null;

let startTimer = (func) => {
  destroyTimer = setTimeout(() => {
    func();
    startTimer(func);
  }, 10000)
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
    let {address, amount, selectedCurrency} = this.props;

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
            <b className="wallet-info__balance">
              {(amount && amount.toString()) || 0}
            </b>
            <div className="wallet-info__currency-container">
              {this.renderCurrencyItem(CurrencyCodes.ETH, selectedCurrency === CurrencyCodes.ETH)}
              {this.renderCurrencyItem(CurrencyCodes.USD, selectedCurrency === CurrencyCodes.USD)}
              {this.renderCurrencyItem(CurrencyCodes.EUR, selectedCurrency === CurrencyCodes.EUR)}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default WalletInfo;