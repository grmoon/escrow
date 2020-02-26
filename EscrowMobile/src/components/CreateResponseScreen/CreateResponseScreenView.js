import React from 'react';
import {NavigationContext} from '@react-navigation/native';
import {View} from 'react-native';
import {Button} from 'react-native-paper';

class CreateResponseScreenView extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    this.state = {photo: null};

    this.onCreateResponseButtonPress = this.onCreateResponseButtonPress.bind(
      this,
    );
    this.onPictureTaken = this.onPictureTaken.bind(this);
  }

  onPictureTaken(photo) {
    this.setState({photo});
  }

  onCreateResponseButtonPress() {
    const {onCreateResponseButtonPress} = this.props;

    onCreateResponseButtonPress({...this.state});
  }

  canCreateResponse() {
    return this.state.photo !== null;
  }

  render() {
    const {navigate} = this.context;

    return (
      <View>
        <Button
          onPress={() =>
            navigate('Camera', {onPictureTaken: this.onPictureTaken})
          }>
          Take Picture
        </Button>
        {this.canCreateResponse() && (
          <Button onPress={this.onCreateResponseButtonPress}>
            Create Response
          </Button>
        )}
      </View>
    );
  }
}

export default CreateResponseScreenView;
