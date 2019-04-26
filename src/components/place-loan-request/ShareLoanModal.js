import React from "react"
import { Modal, ModalBody } from '../modal/modal';

class ShareLoanModal extends React.Component {
  state = {
    requestJson: "",
  }

  handleRequestJson = ({ target }) => this.setState({ requestJson: target.value })

  submitForm(event){
    event.preventDefault();
    this.props.onSubmit(this.state.requestJson);
  }

  render() {
    const { handleClose, isOpen } = this.props
    return (
      <Modal show={isOpen} size="md" onModalClosed={handleClose}>
        <ModalBody>
          <form onSubmit={this.submitForm.bind(this)} className="confirm">
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
            <br/>
            <div>
          <textarea
            className="loan-textarea"
            placeholder="Request JSON"
            name="requestJson"
            cols="50"
            rows="10"
            onChange={this.handleRequestJson}
          />
            </div>
            <br/>
            <button
              className={`confirm__btn confirm__btn_confirm
                        ${!this.state.requestJson ? "confirm__btn_disabled" : ""}`}
            >
              Continue
            </button>
          </form>
        </ModalBody>
      </Modal>
    )
  }
}


export default ShareLoanModal