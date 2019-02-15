import React, {Component} from 'react';
import './wallet-info.css';
import * as CurrencyCodes from '../../common/currencyCodes';

class WalletInfo extends Component{
  constructor(props){
    super(props);

    this.props.getWalletBalance();

    this.renderCurrencyItem = this.renderCurrencyItem.bind(this);
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
            <b className="wallet-info__balance" title={(amount && amount.toString()) || 0}>
              {(amount && amount.toString()) || 0}
            </b>
            <div className="wallet-info__currency-container">
              {this.renderCurrencyItem(CurrencyCodes.ETH, true)}
              {/*{this.renderCurrencyItem(CurrencyCodes.USD, selectedCurrency === CurrencyCodes.USD)}*/}
              {/*{this.renderCurrencyItem(CurrencyCodes.EUR, selectedCurrency === CurrencyCodes.EUR)}*/}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default WalletInfo;