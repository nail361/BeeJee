import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class AdminPanel extends PureComponent {
  onLoginClick() {

  }

  render() {
    const { isLogin } = this.props;
    return (
      <div>
        <input type="text" name="login" placeholder="login" />
        <input type="password" name="pass" placeholder="password" />
        <button
          type="button"
          onClick={() => this.onLoginClick()}
        >
          {isLogin ? 'вход' : 'выход'}
        </button>
      </div>
    );
  }
}

AdminPanel.propTypes = {
  isLogin: PropTypes.bool.isRequired,
}
