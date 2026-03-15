const API_BASE = 'http://localhost:4000/api';

export const api = {
  async request(path, options = {}) {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(err.message);
    }

    return response.status === 204 ? null : response.json();
  }
};
