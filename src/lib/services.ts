import { api } from './api';

// ==========================================
// 1. PUBLIC & LANDING PAGE APIS
// ==========================================
export const publicApi = {
  getStats: () => api.get('/v1/public/stats'),
  getCommodities: () => api.get('/v1/public/commodities'),
  getTestimonials: () => api.get('/v1/public/testimonials'),
};

// ==========================================
// 2. AUTHENTICATION APIS
// ==========================================
export const authApi = {
  register: (data: any) => api.post('/v1/auth/register', data),
  login: (data: any) => api.post('/v1/auth/login', data),
  getMe: () => api.get('/v1/auth/me'),
  logout: () => api.post('/v1/auth/logout', {}),
};

// ==========================================
// 3. ADMIN APIS
// ==========================================
export const adminApi = {
  getDashboard: () => api.get('/v1/admin/dashboard'),
  
  // User Management
  getUsers: () => api.get('/v1/admin/users'),
  updateUserStatus: (id: string, status: string) => api.put(`/v1/admin/users/${id}/status`, { status }),
  
  // Product Moderation
  getProducts: () => api.get('/v1/admin/products'),
  approveProduct: (id: string) => api.put(`/v1/admin/products/${id}/approve`, {}),
  rejectProduct: (id: string, reason: string) => api.put(`/v1/admin/products/${id}/reject`, { reason }),
  
  // Commodities
  getCommodities: () => api.get('/v1/admin/commodities'),
  addCommodity: (data: any) => api.post('/v1/admin/commodities', data),
  updateCommodity: (id: string, data: any) => api.put(`/v1/admin/commodities/${id}`, data),
  deleteCommodity: (id: string) => api.delete(`/v1/admin/commodities/${id}`),
  
  // Market Prices & AI Trends
  getMarketPrices: () => api.get('/v1/admin/market-prices'),
  addMarketPrice: (data: any) => api.post('/v1/admin/market-prices', data),
  getPriceTrends: () => api.get('/v1/admin/price-trends'),
  
  // Settings
  getSettings: () => api.get('/v1/admin/settings'),
  updateSettings: (data: any) => api.put('/v1/admin/settings', data),
};

// ==========================================
// 4. PETANI APIS
// ==========================================
export const petaniApi = {
  getDashboard: () => api.get('/v1/petani/dashboard'),
  
  // Products
  getProducts: () => api.get('/v1/petani/products'),
  addProduct: (data: any) => api.post('/v1/petani/products', data),
  updateProduct: (id: string, data: any) => api.put(`/v1/petani/products/${id}`, data),
  deleteProduct: (id: string) => api.delete(`/v1/petani/products/${id}`),
  
  // Orders
  getOrders: () => api.get('/v1/petani/orders'),
  updateOrderStatus: (id: string, status: string) => api.put(`/v1/petani/orders/${id}/status`, { status }),
  
  // History & Recommendations
  getHistory: () => api.get('/v1/petani/history'),
  getRecommendations: () => api.get('/v1/petani/recommendations'),
  
  // Profile
  getProfile: () => api.get('/v1/petani/profile'),
  updateProfile: (data: any) => api.put('/v1/petani/profile', data),
};
