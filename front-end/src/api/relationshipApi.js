import axiosClient from "./axiosClient";

const relationshipApi = {
  addFriend: (friendCode) => {
    return axiosClient.get(`/add-friend?addFriendCode=${friendCode}`);
  },
};

export default relationshipApi;
