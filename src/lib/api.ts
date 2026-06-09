const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('token')
  const headers: Record<string, string> = {}
  
  if (!(options?.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  // Remove Content-Type if we specifically passed null or if it was overridden poorly
  const finalHeaders: Record<string, any> = {
    ...headers,
    ...options?.headers,
  }
  if (options?.body instanceof FormData && finalHeaders['Content-Type']) {
    delete finalHeaders['Content-Type']
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: finalHeaders,
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: `Terjadi kesalahan server (Kode: ${res.status})` }))
    const errorMessage = errorData.error || errorData.message || `Terjadi kesalahan server (Kode: ${res.status})`
    
    // Global Error Pop Up
    alert(`Error: ${errorMessage}`)
    
    throw new Error(errorMessage)
  }

  return res.json()
}

export const api = {
  get: <T>(path: string, options?: RequestInit) => request<T>(path, options),
  post: <T>(path: string, body: unknown, options?: RequestInit) =>
    request<T>(path, { method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body), ...options }),
  put: <T>(path: string, body: unknown, options?: RequestInit) =>
    request<T>(path, { method: 'PUT', body: body instanceof FormData ? body : JSON.stringify(body), ...options }),
  delete: <T>(path: string, options?: RequestInit) => request<T>(path, { method: 'DELETE', ...options }),
}
