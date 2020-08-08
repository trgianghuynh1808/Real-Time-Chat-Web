import axiosClient from "./axiosClient";

const messageApi = {
  createMessage: (relationshipId, message) => {
    return axiosClient.post("/create-message", {
      relationshipId,
      message
    });
  },
  getConverstation: relationshipId => {
    return axiosClient.get(
      `/get-converstation?relationshipId=${relationshipId}`
    );
  }
};

export default messageApi;
