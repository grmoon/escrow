import React from 'react';
import ErrorBoundaryView from './ErrorBoundaryView';
import {Alert} from 'react-native';

class ErrorBoundaryController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {error: null};
  }

  static getDerivedStateFromError(error) {
    return {error};
  }

  componentDidCatch(error, errorInfo) {
    Alert.alert('componentDidCatch');
    this.setState({error});
  }

  hasError() {
    return this.state.error !== null;
  }

  render() {
    return this.hasError() ? (
      <ErrorBoundaryView error={this.state.error} />
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundaryController;
