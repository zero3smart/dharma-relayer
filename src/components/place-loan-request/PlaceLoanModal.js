import React from "react"
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Modal, ModalBody } from '../modal/modal';
import ConfirmLoanRequest from '../confirm-loan-request/confirm-loan-request';
import UnlockCollateralToken from '../unlock-collateral-token/unlock-collateral-token.js';
import PlaceLoanSuccess from '../place-loan-success/place-loan-success.js';
import WizardSteps from '../wizard-steps/wizard-steps.js';
import {
    placeLoanRequest,
    lockCollateralToken,
    unlockCollateralToken,
    changeDebtOrderConfirmationStep,
    hideLoanConfirmation,
    resetLoanForm,
    runGlobalUpdate
} from "../../actions";

class PlaceLoanModal extends React.Component {
    cancelLoanRequest = () => {
        this.props.resetLoanForm();
        this.props.hideLoanConfirmation()
    }

    renderWizardWithUnlockStep = (currentStepNumber) => (
        <WizardSteps
            steps={['Unlock', 'Review', 'Success']}
            currentStep={currentStepNumber}
        />
    )

    placeLoanRequestHandler = (values) => {
        const { placeLoanRequest, runGlobalUpdate, changeStep, debtOrderConfirmation: { stepNumber } } = this.props;
        placeLoanRequest(values, () => {
            changeStep(stepNumber + 1);
            runGlobalUpdate();
        });
    }

    renderWizardNoUnockStep = (currentStepNumber) => (
        <WizardSteps
            steps={['Review', 'Success']}
            currentStep={currentStepNumber}
        />
    )

    render() {
        const { debtOrderConfirmation, placeLoan, changeStep, unlockCollateralToken, hideLoanConfirmation } = this.props
        const collateralExists = debtOrderConfirmation.collateralAmount > 0;

        let renderUnlockStep = false;
        let renderReviewStep = false;
        let renderFinalStep = false;
        if (debtOrderConfirmation.modalVisible) {
            renderUnlockStep = collateralExists && (debtOrderConfirmation.stepNumber === 1);
            renderReviewStep = (collateralExists && debtOrderConfirmation.stepNumber === 2) || (!collateralExists && debtOrderConfirmation.stepNumber === 1);
            renderFinalStep = (collateralExists && debtOrderConfirmation.stepNumber === 3) || (!collateralExists && debtOrderConfirmation.stepNumber === 2);
        }

        return (
            <Modal show={debtOrderConfirmation.modalVisible} size="md" onModalClosed={hideLoanConfirmation}>
                <div className="loan-request-form__wizard-wrapper">
                    {collateralExists ? this.renderWizardWithUnlockStep(debtOrderConfirmation.stepNumber) : this.renderWizardNoUnockStep(debtOrderConfirmation.stepNumber)}
                </div>

                <ModalBody>
                    {
                        renderUnlockStep &&
                        <UnlockCollateralToken
                            collateralType={debtOrderConfirmation.collateralType}
                            collateralAmount={debtOrderConfirmation.collateralAmount}
                            collateralTokenUnlocked={debtOrderConfirmation.collateralTokenUnlocked}
                            unlockInProgress={debtOrderConfirmation.unlockInProgress}
                            onCancel={this.cancelLoanRequest}
                            onConfirm={() => changeStep(2)}
                            unlockCollateralToken={unlockCollateralToken} />
                    }
                    {
                        renderReviewStep &&
                        <ConfirmLoanRequest
                            {...debtOrderConfirmation}
                            onCancel={() => {
                                collateralExists ? changeStep(1) : this.cancelLoanRequest()
                            }}
                            onConfirm={this.placeLoanRequestHandler}
                            isLoading={placeLoan.isLoading} />
                    }
                    {
                        renderFinalStep &&
                        <PlaceLoanSuccess
                            onConfirm={this.cancelLoanRequest}
                            withCollateral={collateralExists} />
                    }
                </ModalBody>
            </Modal>
        );
    }
}

const selector = formValueSelector('LoanRequestForm');

const mapStateToProps = state => ({
    amount: selector(state, 'amount'),
    term: selector(state, 'term'),
    amortizationFrequency: selector(state, 'amortizationFrequency'),
    debtOrderConfirmation: state.debtOrderConfirmation,
    placeLoan: state.placeLoan
});

const mapDispatchToProps = (dispatch) => ({
    placeLoanRequest(order, callback) {
        dispatch(placeLoanRequest(order, callback))
    },
    hideLoanConfirmation() {
        dispatch(hideLoanConfirmation());
    },
    changeStep(step) {
        dispatch(changeDebtOrderConfirmationStep(step));
    },
    resetLoanForm() {
        dispatch(resetLoanForm());
    },
    runGlobalUpdate() {
        dispatch(runGlobalUpdate());
    },
    unlockCollateralToken(token, amount, unlock) {
        if (unlock) {
            dispatch(unlockCollateralToken(token, amount))
        }
        else {
            dispatch(lockCollateralToken(token, amount))
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceLoanModal)