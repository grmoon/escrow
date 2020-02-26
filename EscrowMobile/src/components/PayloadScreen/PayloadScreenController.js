import React from 'react';

import PayloadScreenView from './PayloadScreenView';

import {useNavigation} from '../../hocs';

class PayloadScreenController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      payload: this.props.route.params.payload,
    };
  }

  render() {
    return <PayloadScreenView payload={this.state.payload} />;
  }
}

export default useNavigation(PayloadScreenController);
