import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody } from "../../components/modal/modal"
import UserInfo from '../../components/user-info/user-info';
import DisclosureModal from '../../components/disclosure-modal/DisclosureModal';
import LoanRequests from '../../containers/loan-requests/loan-requests';
import IssuedLoans from '../../containers/issued-loans/issued-loans';
import OpenLoanRequests from '../../containers/open-loan-requests/open-loan-requests';
import OutstandingLoans from '../../containers/outstanding-loans/outstanding-loans';
import FundedLoans from '../../containers/funded-loans/funded-loans';
import {HOST_URL} from '../../common/api/config';
import { showDisclosure, hideDisclosure, confirmDisclosure } from "../../actions";

class AppContainer extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {

    }

    render() {
      const { disclosureConfirmation, confirmDisclosure } = this.props;

      console.log(disclosureConfirmation);

      return (
        <div className="app__container container-fluid">
            <div className="row flex-sm-nowrap">
                <div className="app__content-left col-sm">
                    <UserInfo />
                </div>
                <div className="app__content-center col-sm">
                    <LoanRequests />
                </div>
                <div className="app__content-right col-sm">
                    <IssuedLoans />
                </div>
            </div>
            <div className="app__content-bottom row flex-sm-nowrap">
                <div className="app__small-table">
                    <OpenLoanRequests />
                </div>
                <div className="app__small-table">
                    <OutstandingLoans />
                </div>
                <div className="app__small-table">
                    <FundedLoans />
                </div>
            </div>
            <div className="app__demo-link">
                Contact us: <a href="mailto:contact@confirmationlabs.io">contact@confirmationlabs.io</a>
                <a href={`${HOST_URL}/swagger/`} target="_blank">API Documentation</a>
            </div>
            <Modal show={disclosureConfirmation.modalVisible} backdrop="static" size="md" onModalClosed={confirmDisclosure}>
                <ModalBody>
                    <DisclosureModal
                      onConfirm={confirmDisclosure}
                      confirmDisabled = {disclosureConfirmation.confirm} />
                </ModalBody>
            </Modal>
        </div>
      );
    }
}

let mapStateToProps = ({disclosureConfirmation}) => ({disclosureConfirmation});

let mapDispatchToProps = { showDisclosure, hideDisclosure, confirmDisclosure };

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);