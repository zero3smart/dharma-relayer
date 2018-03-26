import {connect} from 'react-redux';
import {selectCurrency} from '../../actions';
import WalletInfo from '../../components/wallet-info/wallet-info.js';

let mapStateToProps = ({walletInfo}) => ({...walletInfo});

let mapDispatchToProps = {selectCurrency};

export default connect(mapStateToProps, mapDispatchToProps)(WalletInfo);