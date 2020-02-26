import React from 'react';
import {useNavigation as rnUseNavigation} from '@react-navigation/native';

export function useNavigation(Component) {
  return props => {
    const navigation = rnUseNavigation();

    return <Component {...props} navigation={navigation} />;
  };
}
