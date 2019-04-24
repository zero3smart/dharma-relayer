import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../App/App';
import $ from 'jquery';

export class Modal extends Component {
  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = "modal";
    document.body.appendChild(this.modalTarget);

    this._render(this.props);

    $(this.modalTarget).modal({ show: this.props.show });
    $(this.modalTarget).on('hidden.bs.modal', () => this.props.onModalClosed && this.props.onModalClosed());
  }

  _render(props) {
    let className = ['modal-dialog', props.size ? 'modal-' + props.size : ''].join(" ");
    ReactDOM.render(
      (<Provider store={store}>
        <div className={className} role="document">
          <div className="modal-content">
            {props.show && props.children}
          </div>
        </div>
      </Provider>),
      this.modalTarget
    );
  }


  componentWillReceiveProps(nextProps) {
    $(this.modalTarget).modal(nextProps.show ? 'show' : 'hide');
  }

  shouldComponentUpdate(newProps) {
    return true;
    //return this.props.children !== newProps.children;
  }

  componentWillUpdate(nextProps) {
    this._render(nextProps);

  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    $(this.modalTarget).off();
    document.body.removeChild(this.modalTarget);
  }

  render() {
    return <noscript />;
  }
}

export function ModalHeader(props) {
  return (
    <div>
      <div className="modal-header">
        {props.children}
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>);
}


export function ModalBody(props) {
  return (
    <div>
      <div className="modal-body">
        {props.children}
      </div>
    </div>);
}

export function ModalFooter(props) {
  return (
    <div>
      <div className="modal-footer">
        {props.children}
      </div>
    </div>);
}

export function ModalFooterCloseButton(props) {
  return (<button type="button" className="btn btn-secondary" data-dismiss="modal">{props.children}</button>);
}