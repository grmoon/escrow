import React from 'react';

import {View, Image} from 'react-native';

function PayloadScreenView(props) {
  const {payload} = props;
  const imageProps = {
    style: {width: 50, height: 50},
    source: {uri: payload.image},
  };

  return (
    <View>
      <Image {...imageProps} />
    </View>
  );
}

export default PayloadScreenView;
