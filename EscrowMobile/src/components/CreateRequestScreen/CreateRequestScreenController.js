import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {NavigationContext} from '@react-navigation/native';
import {debounce} from 'lodash';

import CreateRequestScreenView from './CreateRequestScreenView';

import * as RequestApi from '../../apis/request';
import * as UserApi from '../../apis/user';

class CreateRequestScreenController extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    this.state = {
      isSearching: false,
      selectedUser: null,
      users: null,
    };

    this.onSearchbarChangeText = this.onSearchbarChangeText.bind(this);
    this.onSendRequestButtonPress = this.onSendRequestButtonPress.bind(this);
    this.onUserValueChange = this.onUserValueChange.bind(this);

    this.searchUsers = this.searchUsers.bind(this);
    this.debouncedSearchUsers = debounce(this.searchUsers, 1000);
  }

  componentDidMount() {
    this.searchUsers();
  }

  isLoading() {
    return this.state.users === null;
  }

  onUserValueChange(selectedUser) {
    this.setState({selectedUser});
  }

  async onSendRequestButtonPress({photo, description}) {
    const {goBack} = this.context;
    const {selectedUser} = this.state;

    await RequestApi.createRequest({
      description,
      recipient: selectedUser,
      payload: photo,
    });

    goBack();
  }

  async searchUsers(query = {}) {
    const users = await UserApi.readUsers({
      order: 'username',
      ...query,
    });

    this.setState({users, selectedUser: null, isSearching: false});
  }

  async onSearchbarChangeText(usernameSearch) {
    this.setState({isSearching: true});

    this.debouncedSearchUsers({username__icontains: usernameSearch});
  }

  render() {
    const props = {
      isSearching: this.state.isSearching,
      onSearchbarChangeText: this.onSearchbarChangeText,
      onSendRequestButtonPress: this.onSendRequestButtonPress,
      onUserValueChange: this.onUserValueChange,
      selectedUser: this.state.selectedUser,
      users: this.state.users,
    };

    return this.isLoading() ? (
      <ActivityIndicator />
    ) : (
      <CreateRequestScreenView {...props} />
    );
  }
}

export default CreateRequestScreenController;
