import axiosClient from "./axiosClient";

const relationshipApi = {
  addFriend: (friendCode) => {
    return axiosClient.get(`/add-friend?addFriendCode=${friendCode}`);
  },
  getFriendInvitations: () => {
    return axiosClient.get("/get-friend-invitations");
  },
};

export default relationshipApi;
