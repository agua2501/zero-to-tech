async function request(url, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  const token = localStorage.getItem("token");
  if (token) headers["Authorization"] = "Bearer " + token;
  const res = await fetch(url, { ...options, headers });
  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }
  return { ok: res.ok, data };
}

export const api = {
  get(url) {
    return request(url);
  },
  post(url, body) {
    return request(url, { method: "POST", body: JSON.stringify(body) });
  },
};