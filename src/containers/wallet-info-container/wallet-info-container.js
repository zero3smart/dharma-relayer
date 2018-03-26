import {connect} from 'react-redux';
import WalletInfo from '../../components/wallet-info/wallet-info.js';

let mapStateToProps = ({walletInfo}) => ({...walletInfo});

export default connect(mapStateToProps)(WalletInfo);