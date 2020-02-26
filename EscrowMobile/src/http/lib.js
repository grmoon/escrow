async function _fetch() {
  try {
    return fetch(...arguments);
  } catch (err) {
    console.error(err.message);
  }
}

export function createClient(authHeaders) {
  const clientFetch = _fetch;

  return {
    fetch: clientFetch,
    fetchWithAuth(url, userConfig = {}) {
      const headers = {
        ...(userConfig.headers || {}),
        ...authHeaders,
      };

      const config = {
        ...userConfig,
        headers,
      };

      return clientFetch(url, config);
    },
  };
}
