import React from "react"
import { Modal, ModalBody } from '../modal/modal';

const ShareLoanModal = ({ handleClose, isOpen, onSubmit }) => (
	<Modal show={isOpen} size="md" onModalClosed={handleClose}>
		<ModalBody>
			<form onSubmit={onSubmit} className="confirm">
				<div className="confirm__row">
					<div className="confirm__header">
						<h1>
							Share your loan request with lenders on BloqBoard
            </h1>
					</div>
				</div>
				<div>
					Get lenders to fill your loan request by placing your loan request to our board.
        </div>
				<br />
				<div>
					<textarea
						className="loan-textarea"
						placeholder="Request JSON"
						name="requestJson"
						cols="50"
						rows="10"
					/>
				</div>
				<br />
				<button className="confirm__btn confirm__btn_confirm">
					Continue
        </button>
			</form>
		</ModalBody>
	</Modal>
)

export default ShareLoanModal