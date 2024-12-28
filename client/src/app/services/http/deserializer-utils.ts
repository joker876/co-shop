const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

export function smartDeserialize(data: any): any {
  if (Array.isArray(data)) {
    return data.map(item => smartDeserialize(item));
  } else if (data && typeof data === 'object') {
    const obj: any = {};
    for (const key in data) {
      obj[key] = smartDeserialize(data[key]);
    }
    return obj;
  } else if (typeof data === 'string') {
    if (dateRegex.test(data)) {
      return new Date(data.replace('Z', ''));
    }
  }
  return data;
}
