import React from 'react';

import SignupScreenView from './SignupScreenView';

import * as UserApi from '../../apis/user';

class SignupScreenController extends React.Component {
  constructor(props) {
    super(props);

    this.onCreateAccountButtonPress = this.onCreateAccountButtonPress.bind(
      this,
    );
  }
  async onCreateAccountButtonPress({username, password, passwordConfirmation}) {
    const {navigate} = this.props.navigation;

    const user = {
      password,
      password_confirmation: passwordConfirmation,
      username,
    };

    await UserApi.createUser(user);

    navigate('Home');
  }

  render = () => {
    return (
      <SignupScreenView
        onCreateAccountButtonPress={this.onCreateAccountButtonPress}
      />
    );
  };
}

export default SignupScreenController;
