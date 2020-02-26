import React, {useEffect, useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreenController from './src/components/SplashScreen/SplashScreenController';

import {AuthContext, createAuthContext} from './src/contexts/AuthContext';

import * as Storage from './src/storage';

import {APP_SCREENS} from './src/navigators/AppStack';
import {AUTH_SCREENS} from './src/navigators/AuthStack';

const Stack = createStackNavigator();

function AppView(props) {
  const {isLoggedIn, isLoading} = props;
  let screens;

  if (isLoading) {
    screens = [{name: 'Splash', component: SplashScreenController}];
  } else {
    screens = isLoggedIn ? APP_SCREENS : AUTH_SCREENS;
  }

  return (
    <Stack.Navigator>
      {screens.map(screen => (
        <Stack.Screen {...screen} key={screen.name} />
      ))}
    </Stack.Navigator>
  );
}

export default function AppController() {
  const [{isLoggedIn}, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'LOGIN':
          return {
            ...prevState,
            isLoggedIn: true,
          };
        case 'LOGOUT':
          return {
            ...prevState,
            isLoggedIn: false,
          };
        case 'SET_LOGIN_STATE':
          return {
            ...prevState,
            isLoggedIn: action.isLoggedIn,
          };
      }
    },
    {isLoggedIn: null},
  );

  const context = createAuthContext(dispatch);

  useEffect(() => {
    async function initLoginState() {
      const authInfo = await Storage.getAuthInfo();
      const currentLoggedInState = authInfo[Storage.ACCESS_TOKEN_KEY] !== null;

      dispatch({type: 'SET_LOGIN_STATE', isLoggedIn: currentLoggedInState});
    }

    initLoginState();
  }, []);

  const props = {
    isLoggedIn,
    isLoading: isLoggedIn === null,
  };

  return (
    <NavigationContainer>
      <AuthContext.Provider value={context}>
        <AppView {...props} />
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
