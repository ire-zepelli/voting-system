const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(
  /\/$/,
  ""
);

export async function apiRequest(path, options = {}) {
  const { method = "GET", body, token, headers = {}, signal } = options;

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch {
    throw new Error("Unable to reach the backend server.");
  }

  const rawResponse = await response.text();
  const data = rawResponse ? JSON.parse(rawResponse) : null;

  if (!response.ok) {
    throw new Error(data?.message || "Request failed.");
  }

  return data;
}

export { API_BASE_URL };