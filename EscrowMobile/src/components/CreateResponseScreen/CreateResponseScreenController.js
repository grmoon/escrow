import React from 'react';

import * as ResponseApi from '../../apis/response';
import {useNavigation} from '../../hocs';

import CreateResponseScreenView from './CreateResponseScreenView';

class CreateResponseScreenController extends React.Component {
  constructor(props) {
    super(props);

    this.onCreateResponseButtonPress = this.onCreateResponseButtonPress.bind(
      this,
    );

    this.state = {
      request: this.props.route.params.request,
    };
  }

  async onCreateResponseButtonPress({photo}) {
    const {goBack} = this.props.navigation;

    await ResponseApi.createResponse({
      request: this.state.request.id,
      payload: photo,
    });

    goBack();
  }

  render() {
    return (
      <CreateResponseScreenView
        onCreateResponseButtonPress={this.onCreateResponseButtonPress}
      />
    );
  }
}

export default useNavigation(CreateResponseScreenController);
