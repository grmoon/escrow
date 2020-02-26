import {createContext} from 'react';

import * as AuthApi from '../apis/auth';
import * as UserApi from '../apis/user';

import * as Storage from '../storage';

export const DEFAULT_AUTH_CONTEXT = {
  login: () => {},
  logout: () => {},
};

export function createAuthContext(dispatch) {
  return {
    async login({username, password}) {
      const authInfo = await AuthApi.login(username, password);
      const accessToken = authInfo['access_token'];
      const refreshToken = authInfo['refresh_token'];
      const expiresIn = authInfo['expires_in'] * 1000;
      const expiresAt = Date.now() + expiresIn;

      await Storage.setAuthInfo({
        accessToken,
        expiresAt,
        refreshToken,
      });

      const self = await UserApi.readSelf();

      await Storage.setUserInfo(self);

      dispatch({type: 'LOGIN'});
    },
    async logout() {
      const authInfo = await Storage.getAuthInfo();

      await Promise.all([
        AuthApi.logout({
          accessToken: authInfo[Storage.ACCESS_TOKEN_KEY],
          refreshToken: authInfo[Storage.REFRESH_TOKEN_KEY],
        }),
        Storage.removeAuthInfo(),
        Storage.removeUserInfo(),
      ]);

      dispatch({type: 'LOGOUT'});
    },
  };
}

export const AuthContext = createContext(DEFAULT_AUTH_CONTEXT);
