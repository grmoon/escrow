import React from 'react';
import {NavigationContext} from '@react-navigation/native';

import RequestPreviewView from './RequestPreviewView';

class RequestPreviewController extends React.Component {
  static contextType = NavigationContext;

  render() {
    const {navigate} = this.context;
    const {request, incoming} = this.props;

    return (
      <RequestPreviewView
        incoming={incoming}
        onRespondPress={request => navigate('CreateResponse', {request})}
        onViewPress={payload => {
          navigate('Payload', {payload});
        }}
        request={request}
      />
    );
  }
}

export default RequestPreviewController;
