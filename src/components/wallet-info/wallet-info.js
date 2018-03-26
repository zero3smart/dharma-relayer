import React, {Component} from 'react';
import './wallet-info.css';

class WalletInfo extends Component{
  render(){
    return (
      <div className="wallet-info">
        <div className="wallet-info__logo">
        </div>
        <div>
          Ethereum address
          <div className="wallet-info__address">
            {this.props.address}
          </div>
        </div>
        <div >
          Tokens Balance
          <div className="wallet-info__balance-info">
            <div className="wallet-info__balance">
              {this.props.amount} $
            </div>
            <div className="wallet-info__currency-container">
              <div className="wallet-info__currency">ETH</div>
              <div className="wallet-info__currency">USD</div>
              <div className="wallet-info__currency">EUR</div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default WalletInfo;