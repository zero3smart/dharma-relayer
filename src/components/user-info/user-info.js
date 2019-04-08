import React, { Component } from 'react';
import WalletInfoContainer from '../../containers/wallet-info-container/wallet-info-container';
import PlaceLoanRequest from '../place-loan-request/place-loan-request.js';
import BalancesInfo from '../../containers/balances-info/balances-info';
import './user-info.css';

class UserInfo extends Component {
  render() {
    return (
      <div>
        <div>
          <WalletInfoContainer />
        </div>
        <div>
          <PlaceLoanRequest />
        </div>
        <div>
          <BalancesInfo />
        </div>
      </div>
    );
  }
}

export default UserInfo;