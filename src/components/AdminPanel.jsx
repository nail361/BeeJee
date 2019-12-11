import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  saveToken,
  getToken,
  deleteToken,
  loginToServer,
} from '../utils/help';

import '../styles/AdminPanel.scss';

const checkAuth = (username, pass) => {
  return loginToServer(username, pass).then((data) => {
    if (data.status === 'ok') {
      return data.token;
    }
    return null;
  });
};

export default class AdminPanel extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      authError: false,
    };
  }

  componentDidMount() {
    const { login } = this.props;

    const token = getToken();
    if (token) login();
  }

  onLoginClick() {
    const authToken = checkAuth(this.loginField.value, this.passField.value);
    if (authToken != null) this.login(authToken);
    else {
      this.authError();
    }
  }

  onLogoutClick() {
    const { logout } = this.props;
    deleteToken();
    logout();
  }

  login(token) {
    const { login } = this.props;
    saveToken(token);
    login();
  }

  authError() {
    this.loginField.value = '';
    this.passField.value = '';

    this.setState({
      authError: true,
    });

    setTimeout(
      () => {
        this.setState({
          authError: false,
        });
      }, 1500,
    );
  }

  render() {
    const { isLogin } = this.props;
    const { authError } = this.state;

    return (
      <div className="admin-panel">
        {!isLogin && (
          <>
            {authError && <div>ошибка авторизации &nbsp;</div>}
            <input type="text" name="login" ref={(input) => this.loginField = input} placeholder="login" />
            <input type="password" name="pass" ref={(input) => this.passField = input} placeholder="password" />
          </>
        )}
        <button
          type="button"
          onClick={() => !isLogin ? this.onLoginClick() : this.onLogoutClick()}
        >
          {isLogin ? 'выход' : 'вход'}
        </button>
      </div>
    );
  }
}

AdminPanel.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};
