import React, { Component, Fragment } from 'react';
import CheckIcon from '../check-icon/check-icon.js';
import './wizard-steps.css';

class WizardSteps extends Component {

    renderStep(name, number, currentStep) {
        let isCurrentStep = currentStep === number;
        let isPassedStep = currentStep > number;
        return (
            <Fragment key={number}>
                {(number > 1) && (<div className="wizard__step-separator"></div>)}
                <div className={"wizard__step " + (isCurrentStep ? "wizard__step_current " : "") + (isPassedStep ? "wizard__step_done " : "")}>
                    {isPassedStep && <div className="wizard__step-icon"><CheckIcon color="#18253E" size="30px" /></div>}
                    <div className="wizard__step-info">
                        {name}
                    </div>
                </div>
            </Fragment>
        );
    }

    render() {
        let { steps, currentStep } = this.props;
        let i = 1;
        return (
            <div className="wizard">
                {steps.map(step => {
                    return this.renderStep(step, i++, currentStep)
                })}
            </div>
        );
    }
}

export default WizardSteps;