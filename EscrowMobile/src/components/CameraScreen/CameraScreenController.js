import React from 'react';
import {NavigationContext} from '@react-navigation/native';

import CameraScreenView from './CameraScreenView';

class CameraScreenController extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    this.onPictureTaken = this.onPictureTaken.bind(this);
  }

  async onPictureTaken(photo) {
    const {navigation, route} = this.props;
    const {goBack} = navigation;
    const {onPictureTaken} = route.params;

    if (onPictureTaken) {
      await onPictureTaken(photo);
    }

    goBack();
  }

  render() {
    return <CameraScreenView onPictureTaken={this.onPictureTaken} />;
  }
}

export default CameraScreenController;
