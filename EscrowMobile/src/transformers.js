export function jsonToFormData(json) {
  const formData = new FormData();

  Object.entries(json).forEach(([key, value]) => {
    if (key === 'payload') {
      formData.append(key, value.base64);
    } else {
      formData.append(key, value);
    }
  });

  return formData;
}

export function jsonToUriEncoded(json) {
  const formBody = [];

  for (let key in json) {
    const value = json[key];

    if (Array.isArray(value)) {
      const encodedKey = encodeURIComponent(`${key}[]`);

      value.forEach(arrVal => {
        const encodedValue = encodeURIComponent(arrVal);
        formBody.push(encodedKey + '=' + encodedValue);
      });
    } else {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      formBody.push(encodedKey + '=' + encodedValue);
    }
  }

  return formBody.join('&');
}
