import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import '../styles/Modal.scss';

class Modal extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className="modal">
        {children}
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
