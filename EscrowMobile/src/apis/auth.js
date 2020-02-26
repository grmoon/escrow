import {ESCROW_HOST, ESCROW_CLIENT_ID, ESCROW_CLIENT_SECRET} from '../env';
import {getDefaultClient} from '../http/client';
import {jsonToUriEncoded} from '../transformers';

async function authPost(url, json) {
  const http = await getDefaultClient();
  const formBody = jsonToUriEncoded(json);

  return http.fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
  });
}

function revokeToken(token) {
  const url = `${AUTH_API_BASE}/revoke_token/`;
  const json = {
    client_id: ESCROW_CLIENT_ID,
    client_secret: ESCROW_CLIENT_SECRET,
    token: token.value,
    token_type_hint: token.type,
  };

  return authPost(url, json);
}

export const AUTH_API_BASE = `${ESCROW_HOST}/oauth2`;

export async function login(username, password) {
  const url = `${AUTH_API_BASE}/token/`;

  const json = {
    client_id: ESCROW_CLIENT_ID,
    client_secret: ESCROW_CLIENT_SECRET,
    grant_type: 'password',
    password,
    scope: [],
    username,
  };

  const resp = await authPost(url, json);

  return resp.json();
}

export function logout({accessToken, refreshToken}) {
  const tokens = [
    {
      value: accessToken,
      type: 'access_token',
    },
    {
      value: refreshToken,
      type: 'refresh_token',
    },
  ].filter(token => token.value);

  const promises = tokens.map(revokeToken);

  return Promise.all(promises);
}
