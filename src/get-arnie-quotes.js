const { httpGet } = require('./mock-http-interface');

const getMessage = (body) => {
  if (body == null) return '';
  if (typeof body === 'string') {
    try {
      const parsedBody = JSON.parse(body);
      return typeof parsedBody?.message === 'string' ? parsedBody.message : String(body);
    } catch {
      return body;
    }
  }
  return typeof body.message === 'string' ? body.message : '';
};

const fetchQuote = async (url) => {
  try {
    const {status, body} = await httpGet(url);
    const message = getMessage(body)
    return status === 200 ? { 'Arnie Quote': message } : { FAILURE: message }

  } catch (err) {
    const message = err && err.message ? err.message : String(err);
    return { FAILURE: message };
  }
}

const getArnieQuotes = async (urls) => {
  const requests = urls.map(fetchQuote);
  return await Promise.all(requests)
};

module.exports = {
  getArnieQuotes,
};
