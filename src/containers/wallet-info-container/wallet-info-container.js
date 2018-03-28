import {connect} from 'react-redux';
import {selectCurrency, getWalletBalance} from '../../actions';
import WalletInfo from '../../components/wallet-info/wallet-info.js';

let mapStateToProps = ({walletInfo}) => ({...walletInfo});

let mapDispatchToProps = {selectCurrency, getWalletBalance};

export default connect(mapStateToProps, mapDispatchToProps)(WalletInfo);