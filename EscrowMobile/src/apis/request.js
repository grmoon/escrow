import {ESCROW_HOST} from '../env';
import {getDefaultClient} from '../http/client';
import {jsonToFormData, jsonToUriEncoded} from '../transformers';

export const REQUEST_API_BASE = `${ESCROW_HOST}/api/deals/v1`;

export async function readRequests(query = {}) {
  const queryString = jsonToUriEncoded(query);
  const url = `${REQUEST_API_BASE}/requests/?${queryString}`;

  const http = await getDefaultClient();
  const resp = await http.fetchWithAuth(url);

  return resp.json();
}

export async function createRequest(jsonBody) {
  const url = `${REQUEST_API_BASE}/requests/`;
  const formData = jsonToFormData(jsonBody);

  const http = await getDefaultClient();
  const resp = await http.fetchWithAuth(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });

  return resp.json();
}
