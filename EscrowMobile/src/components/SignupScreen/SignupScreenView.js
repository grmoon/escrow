import React from 'react';
import {TextInput, Button} from 'react-native-paper';
import {View} from 'react-native';

class SignupScreenView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: 'Ss1204370630sS',
      passwordConfirmation: 'Ss1204370630sS',
      username: 'test',
    };

    this.onCreateAccountButtonPress = this.onCreateAccountButtonPress.bind(
      this,
    );
  }

  onCreateAccountButtonPress() {
    this.props.onCreateAccountButtonPress({
      ...this.state,
    });
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
          textContentType={'newPassword'}
          value={this.state.password}
        />
        <TextInput
          autoCapitalize={'none'}
          autoCompleteType={'password'}
          autoCorrect={false}
          label="Confirm Password"
          onChangeText={passwordConfirmation =>
            this.setState({passwordConfirmation})
          }
          secureTextEntry={true}
          textContentType={'newPassword'}
          value={this.state.passwordConfirmation}
        />
        <Button onPress={this.onCreateAccountButtonPress}>
          Create Account
        </Button>
      </View>
    );
  }
}

export default SignupScreenView;
