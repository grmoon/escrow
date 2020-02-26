import React from 'react';
import {Button} from 'react-native-paper';
import {View} from 'react-native';

function HomeScreenView(props) {
  return (
    <View>
      <Button onPress={props.onRequestListButtonPress}>View Requests</Button>
      <Button onPress={props.onCreateRequestButtonPress}>Create Request</Button>
      <Button onPress={props.onLogoutButtonPress}>Logout</Button>
    </View>
  );
}

export default HomeScreenView;
