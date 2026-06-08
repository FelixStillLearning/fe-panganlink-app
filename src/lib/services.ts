import { api } from './api';

// ==========================================
// 1. PUBLIC & LANDING PAGE APIS
// ==========================================
export const publicApi = {
  getStats: () => api.get('/public/stats'),
  getCommodities: () => api.get('/public/commodities'),
  getTestimonials: () => api.get('/public/testimonials'),
};

// ==========================================
// 2. AUTHENTICATION APIS
// ==========================================
export const authApi = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout', {}),
};

// ==========================================
// 3. ADMIN APIS
// ==========================================
export const adminApi = {
  getDashboard: () => api.get('/admin/dashboard'),
  
  // User Management
  getUsers: () => api.get('/admin/users'),
  updateUserStatus: (id: string, status: string) => api.put(`/admin/users/${id}/status`, { status }),
  
  // Product Moderation
  getProducts: () => api.get('/admin/products'),
  approveProduct: (id: string) => api.put(`/admin/products/${id}/approve`, {}),
  rejectProduct: (id: string, reason: string) => api.put(`/admin/products/${id}/reject`, { reason }),
  
  // Commodities
  getCommodities: () => api.get('/admin/commodities'),
  addCommodity: (data: any) => api.post('/admin/commodities', data),
  updateCommodity: (id: string, data: any) => api.put(`/admin/commodities/${id}`, data),
  deleteCommodity: (id: string) => api.delete(`/admin/commodities/${id}`),
  
  // Market Prices & AI Trends
  getMarketPrices: () => api.get('/admin/market-prices'),
  addMarketPrice: (data: any) => api.post('/admin/market-prices', data),
  getPriceTrends: () => api.get('/admin/price-trends'),
  
  // Settings
  getSettings: () => api.get('/admin/settings'),
  updateSettings: (data: any) => api.put('/admin/settings', data),
};
