import React from 'react';

import LoginScreenView from './LoginScreenView';

import {AuthContext} from '../../contexts/AuthContext';

class LoginScreenController extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.onLoginButtonPress = this.onLoginButtonPress.bind(this);
    this.onSignupButtonPress = this.onSignupButtonPress.bind(this);
  }

  async onLoginButtonPress({username, password}) {
    const {navigate} = this.props.navigation;

    await this.context.login({username, password});
    navigate('Home');
  }

  async onSignupButtonPress() {
    const {navigate} = this.props.navigation;

    navigate('Signup');
  }

  render() {
    return (
      <LoginScreenView
        onLoginButtonPress={this.onLoginButtonPress}
        onSignupButtonPress={this.onSignupButtonPress}
      />
    );
  }
}

export default LoginScreenController;
