import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

import RequestListScreenView from './RequestListScreenView';

import ErrorBoundaryController from '../ErrorBoundary/ErrorBoundaryController';

import * as RequestApi from '../../apis/request';
import * as Storage from '../../storage';

class RequestListScreenController extends React.Component {
  constructor(props) {
    super(props);

    this.onRefresh = this.onRefresh.bind(this);

    this.state = {
      incoming: this.props.direction === 'incoming',
      refreshing: false,
      requests: null,
    };
  }

  isLoading() {
    return this.state.requests === null;
  }

  async getRequests() {
    const user = await Storage.getUserInfo();
    const {incoming} = this.state;
    const query = {
      order: '-created_at',
    };

    if (incoming) {
      query.recipient = user.id;
    } else {
      query.sender = user.id;
    }

    return RequestApi.readRequests(query);
  }

  async onRefresh() {
    this.setState({refreshing: true});

    const requests = await this.getRequests();

    this.setState({requests, refreshing: false});
  }

  async componentDidMount() {
    const requests = await this.getRequests();

    this.setState({requests});
  }

  render() {
    return (
      <ErrorBoundaryController>
        {this.isLoading() ? (
          <ActivityIndicator />
        ) : (
          <RequestListScreenView
            incoming={this.state.incoming}
            onRefresh={this.onRefresh}
            refreshing={this.state.refreshing}
            requests={this.state.requests}
          />
        )}
      </ErrorBoundaryController>
    );
  }
}

export function createRequestListScreenController({direction}) {
  const props = {direction};

  return () => {
    return <RequestListScreenController {...props} />;
  };
}
