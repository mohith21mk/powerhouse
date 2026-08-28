/**
 * POWER HOUSE API Client Layer
 * 
 * Configurable REST client for communicating with the FastAPI backend.
 * Provides resilient fallbacks if the backend server is temporarily unreachable.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

class ApiClient {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `API error (${response.status}): ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      // Re-throw with contextual tag so consumers can decide to fall back
      err.isNetworkError = true;
      throw err;
    }
  }

  // Health check
  async getHealth() {
    const healthUrl = this.baseUrl.replace(/\/api\/v1$/, '') + '/health';
    const res = await fetch(healthUrl);
    return await res.json();
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
}

export const apiClient = new ApiClient();
export default apiClient;
