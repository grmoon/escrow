import AsyncStorage from '@react-native-community/async-storage';

export const ACCESS_TOKEN_KEY = '@oauth.accessToken';
export const EXPIRES_AT_KEY = '@oauth.expiresAt';
export const REFRESH_TOKEN_KEY = '@oauth.refreshToken';

export const USER_ID_KEY = '@user.id';
export const USER_USERNAME_KEY = '@user.username';

export function setAuthInfo({accessToken, expiresAt, refreshToken}) {
  return Promise.all([
    AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken),
    AsyncStorage.setItem(EXPIRES_AT_KEY, expiresAt.toString()),
    AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken),
  ]);
}

export async function getAuthInfo() {
  const [accessToken, expiresAt, refreshToken] = await Promise.all([
    AsyncStorage.getItem(ACCESS_TOKEN_KEY),
    AsyncStorage.getItem(EXPIRES_AT_KEY),
    AsyncStorage.getItem(REFRESH_TOKEN_KEY),
  ]);

  return {
    [ACCESS_TOKEN_KEY]: accessToken,
    [EXPIRES_AT_KEY]: parseInt(expiresAt),
    [REFRESH_TOKEN_KEY]: refreshToken,
  };
}

export function removeAuthInfo() {
  return Promise.all([
    AsyncStorage.removeItem(ACCESS_TOKEN_KEY),
    AsyncStorage.removeItem(EXPIRES_AT_KEY),
    AsyncStorage.removeItem(REFRESH_TOKEN_KEY),
  ]);
}

export function setUserInfo({username, id}) {
  return Promise.all([
    AsyncStorage.setItem(USER_USERNAME_KEY, username),
    AsyncStorage.setItem(USER_ID_KEY, id),
  ]);
}

export async function getUserInfo() {
  const [username, id] = await Promise.all([
    AsyncStorage.getItem(USER_USERNAME_KEY),
    AsyncStorage.getItem(USER_ID_KEY),
  ]);

  return {username, id};
}

export function removeUserInfo() {
  return Promise.all([
    AsyncStorage.removeItem(USER_USERNAME_KEY),
    AsyncStorage.removeItem(USER_ID_KEY),
  ]);
}
