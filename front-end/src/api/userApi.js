import axiosClient from "./axiosClient";

const userApi = {
  getAll: () => {
    return axiosClient.get("/users");
  },
  register: (body) => {
    return axiosClient.post("/register-user", { ...body });
  },
};

export default userApi;
