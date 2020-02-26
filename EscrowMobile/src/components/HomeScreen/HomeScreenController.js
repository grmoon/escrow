import React from 'react';
import HomeScreenView from './HomeScreenView';

import ErrorBoundaryController from '../ErrorBoundary/ErrorBoundaryController';

import {AuthContext} from '../../contexts/AuthContext';

class HomeScreenController extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.onCreateRequestButtonPress = this.onCreateRequestButtonPress.bind(
      this,
    );
    this.onRequestListButtonPress = this.onRequestListButtonPress.bind(this);
    this.onLogoutButtonPress = this.onLogoutButtonPress.bind(this);
  }

  onCreateRequestButtonPress() {
    const {navigate} = this.props.navigation;
    navigate('CreateRequest');
  }

  onRequestListButtonPress() {
    const {navigate} = this.props.navigation;
    navigate('RequestList');
  }

  async onLogoutButtonPress() {
    this.context.logout();
  }

  render() {
    return (
      <ErrorBoundaryController>
        <HomeScreenView
          onCreateRequestButtonPress={this.onCreateRequestButtonPress}
          onRequestListButtonPress={this.onRequestListButtonPress}
          onLogoutButtonPress={this.onLogoutButtonPress}
        />
      </ErrorBoundaryController>
    );
  }
}

export default HomeScreenController;
