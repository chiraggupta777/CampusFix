import api from "./api";

export const issueService = {
  createIssue: (payload) => api.post("/issues", payload),

  getMyIssues: () => api.get("/issues/my"),

  getIssueById: (id) => api.get(`/issues/${id}`),

  uploadImages: (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    return api.post("/upload/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default issueService;
