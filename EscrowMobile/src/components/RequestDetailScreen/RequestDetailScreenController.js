import React from 'react';
import {ActivityIndicator} from 'react-native';

import RequestDetailScreenView from './RequestDetailScreenView';

import * as Storage from '../../storage';

class RequestDetailScreenController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isIncomingRequest: null,
      request: this.props.navigation.getParam('request'),
    };
  }

  isLoading() {
    return this.state.isIncomingRequest === null;
  }

  async componentDidMount() {
    const userInfo = await Storage.getUserInfo();
    const isIncomingRequest = (userInfo.id = this.state.request.recipient);

    this.setState({isIncomingRequest});
  }

  render() {
    return this.isLoading() ? (
      <ActivityIndicator />
    ) : (
      <RequestDetailScreenView
        request={this.state.request}
        isIncomingRequest={this.state.isIncomingRequest}
      />
    );
  }
}

export default RequestDetailScreenController;
