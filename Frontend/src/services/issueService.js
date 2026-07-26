import api from "./api";

export const issueService = {
  createIssue: (payload) => api.post("/issues", payload),

  getMyIssues: () => api.get("/issues/my"),

  getIssueById: (id) => api.get(`/issues/${id}`),

  getAdminIssues: () => api.get("/admin/issues"),

  getAdminIssueById: (id) => api.get(`/admin/issues/${id}`),

  getDashboardStats: () => api.get("/admin/dashboard"),

  updateAdminIssueStatus: (id, payload) => api.patch(`/admin/issues/${id}/status`, payload),

  uploadImages: (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    return api.post("/upload/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default issueService;
