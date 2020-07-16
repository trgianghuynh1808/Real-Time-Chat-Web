import axiosClient from "./axiosClient";

const userApi = {
  getAll: () => {
    return axiosClient.get("/users");
  },
  register: (body) => {
    return axiosClient.post("/register-user", { ...body });
  },
  login: (body) => {
    return axiosClient.post("/login-user", { ...body });
  },
  forgotPassword: (email) => {
    return axiosClient.get(`/forgot-password?email=${email}`);
  },
  getCurrentUser: () => {
    return axiosClient.get("/get-current-user");
  },
  updateStatusCaption: (statusMsg) => {
    return axiosClient.post("/update-status-caption", { statusMsg });
  },
};

export default userApi;
