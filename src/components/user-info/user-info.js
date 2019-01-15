import React, {Component} from 'react';
import WalletInfoContainer from '../../containers/wallet-info-container/wallet-info-container';
import PlaceLoanRequest from '../place-loan-request/place-loan-request.js';
import OpenLoanRequests from '../../containers/open-loan-requests/open-loan-requests';
import OutstandingLoans from '../../containers/outstanding-loans/outstanding-loans';
import FundedLoans from '../../containers/funded-loans/funded-loans';
import './user-info.css';

class UserInfo extends Component{
  render(){
    return (
      <div>
        <div className="">
          <WalletInfoContainer />
        </div>
        <div>
          <PlaceLoanRequest />
        </div>
        <div className="user-info__small-table">
          <OpenLoanRequests />
        </div>
       <div className="user-info__small-table">
         <OutstandingLoans />
       </div>
       <div className="user-info__small-table">
         <FundedLoans />
       </div>
      </div>
    );
  }
}

export default UserInfo;