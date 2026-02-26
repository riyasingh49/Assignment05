const BASE = import.meta.env.VITE_API_BASE_URL

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText)
    throw new Error(msg || `HTTP ${res.status}`)
  }
  return res.json()
}

const userService = {
  getAll: ({ page = 1, limit = 10 } = {}) => {
    const skip = (page - 1) * limit
    return request(`/users?limit=${limit}&skip=${skip}&select=id,firstName,lastName,email,phone,age,image,company,address`)
  },
  getOne: (id) => request(`/users/${id}`),
  create: (data) => request('/users/add', { method: 'POST', body: JSON.stringify(data) }),
  update: ({ id, ...data }) => request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/users/${id}`, { method: 'DELETE' }),
}

export default userService