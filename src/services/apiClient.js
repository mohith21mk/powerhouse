/**
 * POWER HOUSE API Client Layer
 * 
 * Configurable REST client for communicating with the FastAPI backend.
 * Provides resilient fallbacks if the backend server is temporarily unreachable.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1';

class ApiClient {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.token = typeof window !== 'undefined' ? window.localStorage.getItem('ph_token') : null;
  }

  setToken(token) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        window.localStorage.setItem('ph_token', token);
      } else {
        window.localStorage.removeItem('ph_token');
      }
    }
  }

  getToken() {
    if (!this.token && typeof window !== 'undefined') {
      this.token = window.localStorage.getItem('ph_token');
    }
    return this.token;
  }

  clearToken() {
    this.setToken(null);
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    let response;
    try {
      response = await fetch(url, {
        ...options,
        headers,
      });
    } catch (fetchError) {
      // Genuine network failure: backend server offline, connection refused, DNS failure
      const netErr = new Error('Authentication service is unavailable. Please check your connection.');
      netErr.isNetworkError = true;
      netErr.originalError = fetchError;
      throw netErr;
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      let message = '';
      if (typeof errorData.detail === 'string') {
        message = errorData.detail;
      } else if (Array.isArray(errorData.detail)) {
        message = errorData.detail
          .map((d) => d.msg || `${d.loc ? d.loc.slice(1).join('.') : 'field'}: invalid value`)
          .join(', ');
      } else if (errorData.message) {
        message = errorData.message;
      } else {
        message = `API error (${response.status}): ${response.statusText}`;
      }

      const httpError = new Error(message);
      httpError.status = response.status;
      httpError.statusText = response.statusText;
      httpError.errorData = errorData;
      httpError.isNetworkError = false;
      throw httpError;
    }

    return await response.json();
  }

  // Health check
  async getHealth() {
    const healthUrl = this.baseUrl.replace(/\/api\/v1$/, '') + '/health';
    const res = await fetch(healthUrl);
    if (!res.ok) {
      throw new Error(`Health check failed with status ${res.status}`);
    }
    return await res.json();
  }

  // Authentication Endpoints
  async signup(data) {
    const res = await this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res?.access_token) {
      this.setToken(res.access_token);
    }
    return res;
  }

  async login(data) {
    const res = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res?.access_token) {
      this.setToken(res.access_token);
    }
    return res;
  }

  async getMe() {
    return this.request('/auth/me');
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } catch (e) {
      // Proceed with local logout regardless of network
    } finally {
      this.clearToken();
    }
  }

  // Business Profile Endpoints
  async getBusinessProfiles() {
    return this.request('/business-profile');
  }

  async getBusinessProfile(id) {
    return this.request(`/business-profile/${id}`);
  }

  async createBusinessProfile(data) {
    return this.request('/business-profile', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBusinessProfile(id, data) {
    return this.request(`/business-profile/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Business Analysis Endpoints
  async runAnalysis(profileId) {
    return this.request(`/business-analysis/${profileId}`, {
      method: 'POST',
    });
  }

  async getLatestAnalysis(profileId) {
    return this.request(`/business-analysis/${profileId}/latest`);
  }

  async getAnalysisById(analysisId) {
    return this.request(`/business-analysis/report/${analysisId}`);
  }

  // Approvals Endpoints
  async getApprovals(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/approvals${query ? `?${query}` : ''}`);
  }

  async updateApproval(id, data) {
    return this.request(`/approvals/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Tasks Endpoints
  async getTasks(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/tasks${query ? `?${query}` : ''}`);
  }

  async createTask(data) {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTask(id, data) {
    return this.request(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async completeTask(id) {
    return this.request(`/tasks/${id}/complete`, {
      method: 'PATCH',
    });
  }

  // Documents Endpoints
  async getDocuments(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/documents${query ? `?${query}` : ''}`);
  }

  async createDocument(data) {
    return this.request('/documents', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Applications Endpoints
  async getApplications(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/applications${query ? `?${query}` : ''}`);
  }

  async createApplication(data) {
    return this.request('/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Schemes Endpoints
  async getSchemes(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/schemes${query ? `?${query}` : ''}`);
  }

  // Alerts Endpoints
  async getAlerts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/alerts${query ? `?${query}` : ''}`);
  }

  async markAlertAsRead(id) {
    return this.request(`/alerts/${id}/read`, {
      method: 'PATCH',
    });
  }

  async markAllAlertsAsRead(businessProfileId = null) {
    const query = businessProfileId ? `?business_profile_id=${businessProfileId}` : '';
    return this.request(`/alerts/read-all${query}`, {
      method: 'PATCH',
    });
  }

  // Hybrid Regulatory Vector RAG Endpoints
  async queryRag(businessProfileId, question, topK = 5) {
    return this.request('/rag/query', {
      method: 'POST',
      body: JSON.stringify({
        business_profile_id: businessProfileId,
        question: question,
        top_k: topK,
      }),
    });
  }

  async getRagSources() {
    return this.request('/rag/sources');
  }
}

export const apiClient = new ApiClient();
export default apiClient;

