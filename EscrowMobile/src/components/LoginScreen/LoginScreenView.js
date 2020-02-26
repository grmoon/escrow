import React from 'react';
import {TextInput, Button} from 'react-native-paper';
import {View} from 'react-native';

class LoginScreenView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'grmoon',
      password: '1',
    };

    this.onLoginButtonPress = this.onLoginButtonPress.bind(this);
  }

  onLoginButtonPress() {
    this.props.onLoginButtonPress({...this.state});
  }

  render() {
    return (
      <View>
        <TextInput
          autoCapitalize={'none'}
          autoCompleteType={'username'}
          autoCorrect={false}
          autoFocus={true}
          label="Username"
          onChangeText={username => this.setState({username})}
          textContentType={'username'}
          value={this.state.username}
        />
        <TextInput
          autoCapitalize={'none'}
          autoCompleteType={'password'}
          autoCorrect={false}
          label="Password"
          onChangeText={password => this.setState({password})}
          secureTextEntry={true}
          textContentType={'password'}
          value={this.state.password}
        />
        <Button onPress={this.onLoginButtonPress}>Login</Button>
        <Button onPress={this.props.onSignupButtonPress}>Sign Up</Button>
      </View>
    );
  }
}

export default LoginScreenView;
