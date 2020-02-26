import {ESCROW_HOST} from '../env';
import {getDefaultClient} from '../http/client';
import {jsonToFormData} from '../transformers';

export const RESPONSE_API_BASE = `${ESCROW_HOST}/api/deals/v1`;

export async function createResponse(jsonBody) {
  const url = `${RESPONSE_API_BASE}/responses/`;
  const http = await getDefaultClient();

  const formData = jsonToFormData(jsonBody);
  const resp = await http.fetchWithAuth(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });

  return resp.json();
}
