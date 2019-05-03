import React, {Component} from 'react';
import '../confirm/confirm.css';

class DisclosureModal extends Component{

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      checked: props.confirmDisabled
    };
  }

  onChange(e) {
    let checked = e.target.checked;
    this.setState({
      checked: checked
    })
  }

  render(){
    let {onConfirm} = this.props;

    return (
      <div className="confirm__disclosure">
        <div className="confirm">
          <div className="confirm__row">
            <div className="confirm__header"><h5>Main disclosure</h5></div>
          </div>
          <p>BloqBoard is a free software-based tool intended to help users to create and display their loan requests for ERC20-compatible blockchain tokens issued in compliance with the Dharma Protocol on a purely peer-to-peer basis. BloqBeacon is not a regulated marketplace, exchange or intermediary of any kind and is merely an aggregator of information.</p>
          <p>BloqBoard is not a party to any contract entered into between users of the Dharma Protocol, does not act as a lender or give loans using the Dharma Protocol, and does not otherwise enter into any agreements with or commit to any obligations to any user of the Dharma Protocol. Further, you acknowledge that the Dharma Protocol is in beta testing, may have limited functionality, and may contain errors.</p>
          <p>By clicking “I Agree” below, you understand that you are solely responsible for interacting with smart contracts deployed by third parties on the Ethereum blockchain and are in compliance with all applicable laws and regulations.</p>
          <div className="unlock-tokens__toggle-wrapper">
            <label><input type="checkbox" checked={this.state.checked} onChange={this.onChange}/> I have read and agree with the terms</label>
          </div>
          <div className="confirm__buttons">
            <div className="confirm__btn-wrapper confirm__btn-wrapper_centered">
              <button
                className={"confirm__btn confirm__btn_confirm " + (!this.state.checked ? "confirm__btn_disabled" : "")}
                disabled={!this.state.checked}
                onClick={() => onConfirm && onConfirm()}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default DisclosureModal;