import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { validateEmail, safeText } from '../utils/help';
import '../styles/AddTaskModal.scss';

class AddTaskModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      emailClass: '',
      nameClass: '',
      textClass: '',
    };
  }

  inputsValidation() {
    let hasError = false;

    if (this.nameFiled.value === '') {
      hasError = true;
      this.setState({
        nameClass: 'error',
      });
      setTimeout(
        () => this.setState({
          nameClass: '',
        }),
        1500,
      );
    }

    if (this.textField.value === '') {
      hasError = true;
      this.setState({
        textClass: 'error',
      });
      setTimeout(
        () => this.setState({
          textClass: '',
        }),
        1500,
      );
    }

    if (!validateEmail(this.emailField.value)) {
      hasError = true;
      this.setState({
        emailClass: 'error',
      });
      setTimeout(
        () => this.setState({
          emailClass: '',
        }),
        1500,
      );
    }

    if (!hasError) {
      const { addTask, close } = this.props;
      addTask(
        safeText(this.nameFiled.value),
        safeText(this.emailField.value),
        safeText(this.textField.value),
      );
      close();
    }
  }

  render() {
    const { emailClass, nameClass, textClass } = this.state;

    return (
      <div className="add-task-modal">
        <div className="add-task-window">
          <input type="text" className={nameClass} ref={(input) => this.nameFiled = input} name="name" placeholder="имя" />
          <input type="email" className={emailClass} ref={(input) => this.emailField = input} name="email" placeholder="e-mail" />
          <input type="text" className={textClass} ref={(input) => this.textField = input} name="text" placeholder="текст" />
          <button type="button" onClick={() => this.inputsValidation()}>Создать</button>
        </div>
      </div>
    );
  }
}

export default AddTaskModal;

AddTaskModal.propTypes = {
  addTask: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};
