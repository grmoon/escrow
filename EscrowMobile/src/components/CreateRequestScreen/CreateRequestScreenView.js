import React from 'react';
import {
  ActivityIndicator,
  Button,
  Searchbar,
  TextInput,
} from 'react-native-paper';
import {NavigationContext} from '@react-navigation/native';
import {View, Picker} from 'react-native';

class CreateResponseScreenView extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    this.state = {
      description: null,
      photo: null,
    };

    this.onSendRequestButtonPress = this.onSendRequestButtonPress.bind(this);
    this.onPictureTaken = this.onPictureTaken.bind(this);
  }

  onSendRequestButtonPress() {
    this.props.onSendRequestButtonPress({...this.state});
  }

  onPictureTaken(photo) {
    this.setState({photo});
  }

  canCreateRequest() {
    const {photo, description, user} = this.state;

    return ![photo, description, user].includes(null);
  }

  render() {
    const {navigate} = this.context;
    const {
      onUserValueChange,
      onSearchbarChangeText,
      isSearching,
      selectedUser,
    } = this.props;
    const {description: currentDescription} = this.state;

    return (
      <View>
        <Searchbar
          autoCapitalize={'none'}
          autoCorrect={false}
          autoFocus={true}
          onChangeText={onSearchbarChangeText}
          placeholder="Search"
        />
        {isSearching ? (
          <ActivityIndicator />
        ) : (
          <Picker
            selectedValue={selectedUser}
            onValueChange={onUserValueChange}>
            {this.props.users.map(user => (
              <Picker.Item
                label={user.username}
                value={user.id}
                key={user.id}
              />
            ))}
          </Picker>
        )}
        <TextInput
          label="Description"
          onChangeText={description => this.setState({description})}
          value={currentDescription}
        />
        <Button
          onPress={() =>
            navigate('Camera', {onPictureTaken: this.onPictureTaken})
          }>
          Take Picture
        </Button>
        {this.canCreateRequest() && (
          <Button onPress={this.onSendRequestButtonPress}>Send Request</Button>
        )}
      </View>
    );
  }
}

export default CreateResponseScreenView;
