import * as Storage from '../storage';
import {createClient} from './lib';

export async function getDefaultClient() {
  const authInfo = await Storage.getAuthInfo();
  const headers = {
    Authorization: `Bearer ${authInfo[Storage.ACCESS_TOKEN_KEY]}`,
  };

  return createClient(headers);
}
