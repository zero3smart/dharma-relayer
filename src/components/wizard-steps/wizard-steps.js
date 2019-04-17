import React, { Component, Fragment } from 'react';
import CheckIcon from '../check-icon/check-icon.js';
import './wizard-steps.css';

class WizardSteps extends Component {

	renderStep(name, number, currentStep, isLastStep) {
		let isCurrentStep = currentStep === number;
		let isPassedStep = isLastStep || currentStep > number;
		return (
			<Fragment key={number}>
				{(number > 1) && (<div className="wizard__step-separator"></div>)}
				<div
					className={"wizard__step " + (isCurrentStep && !isLastStep ? "wizard__step_current " : "") + (isPassedStep ? "wizard__step_done " : "")}>
					{isPassedStep && <div className="wizard__step-icon"><CheckIcon color="#18253E" size="30px" /></div>}
					{isCurrentStep && !isLastStep && <div className="wizard__step-icon"><CheckIcon color="#FFFFFF" size="30px" /></div>}
					<div className="wizard__step-info">
						{name}
					</div>
				</div>
			</Fragment>
		);
	}

	render() {
		let { steps, currentStep } = this.props;
		const isLastStep = steps.length === currentStep
		let i = 1;
		return (
			<div className="wizard">
				{steps.map(step => {
					return this.renderStep(step, i++, currentStep, isLastStep)
				})}
			</div>
		);
	}
}

export default WizardSteps;