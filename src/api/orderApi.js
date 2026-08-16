const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};
const API_BASE_URL = env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const buildApiUrl = (path) => `${API_BASE_URL}${path}`;

const request = async (path, options = {}) => {
  // Get JWT token from localStorage
  const token = localStorage.getItem("token");

  // Merge existing headers
  const headers = {
    ...(options.headers || {}),
  };

  // Add Authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(buildApiUrl(path), {
    ...options,
    headers,
  });

  // Token expired or invalid
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  // Other errors
  if (!response.ok) {
    const errorMessage = await response.text().catch(() => "");
    throw new Error(errorMessage || `Request failed with status ${response.status}`);
  }

  return response;
};

// Orders Api Admin

export const getAdminAllOrders = async () =>{
  const res = await request('admin/orders');
  return res.json();
}

export const getAdminAllOrdersById = async (id) => {
  const res = await request(`admin/orders/${id}`);
  return res.json();
}
export const updateStatusAdmin = async (id, req) => {
  const res = await request(`/admin/orders/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify(req)
  });
  return res;
}

// Order Api Users

export const placeUserOrder = async (orderRequest) => {
  const res = await request('/orders', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderRequest)
  });
  return res;
}

export const getUserOrder = async () => {
  const res = await request('/orders');
  return res;
}

export const cancelOrder = async (orderNumber) => {
  // console.log(orderNumber);
  const res = await request(`/orders/${orderNumber}/cancel`,{
    method: 'PATCH'
  });
  return res;
}