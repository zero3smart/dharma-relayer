import React from "react"
import { Modal, ModalBody } from "../../components/modal/modal"

const RepayLoanModal = ({ handleClose, isOpen, ...props }) => {
    return (
        <Modal show={isOpen} size="md" onModalClosed={handleClose}>
            <ModalBody>
                <h1>Make Repayment</h1>
                <p>
                    You are making a repayment for debt agreement
                </p>
                <p>
                    How large of repayment would you like to make?
                </p>
                <div className="confirm__buttons">
                    <div className="confirm__btn-wrapper">
                        <button
                            className="confirm__btn confirm__btn_cancel"
                            onClick={handleClose}
                        >
                            CANCEL
                        </button>
                        <button className="confirm__btn confirm__btn_confirm" disabled="">
                            MAKE REPAYMENT
                        </button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default RepayLoanModal