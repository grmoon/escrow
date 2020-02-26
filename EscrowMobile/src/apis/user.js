import {ESCROW_HOST} from '../env';
import {getDefaultClient} from '../http/client';
import {jsonToUriEncoded} from '../transformers';

export const USER_API_BASE = `${ESCROW_HOST}/api/users/v1`;

export async function readSelf() {
  const http = await getDefaultClient();
  const url = `${USER_API_BASE}/users/self/`;
  const resp = await http.fetchWithAuth(url);

  return resp.json();
}

export async function readUser(id, query = {}) {
  const http = await getDefaultClient();
  const url = `${USER_API_BASE}/users/${id}/`;
  const resp = await http.fetchWithAuth(url);

  return resp.json();
}

export async function readUsers(query = {}) {
  const queryString = jsonToUriEncoded(query);
  const url = `${USER_API_BASE}/users/?${queryString}`;
  const http = await getDefaultClient();
  const resp = await http.fetchWithAuth(url);

  return resp.json();
}

export async function createUser(user) {
  const url = `${USER_API_BASE}/users/`;
  const http = await getDefaultClient();
  const resp = await http.fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  return resp.json();
}
