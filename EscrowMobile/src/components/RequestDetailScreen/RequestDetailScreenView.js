import React from 'react';

import {View, Image, Alert} from 'react-native';

function RequestDetailScreenView(props) {
  const {request, isIncomingRequest} = props;
  Alert.alert(`isIncomingRequest ${isIncomingRequest}`);
  const imageProps = {
    style: {width: 50, height: 50},
    source: {
      uri: isIncomingRequest
        ? request.response.payload
        : request.response.payload,
    },
  };

  return (
    <View>
      <Image {...imageProps} />
    </View>
  );
}

export default RequestDetailScreenView;
