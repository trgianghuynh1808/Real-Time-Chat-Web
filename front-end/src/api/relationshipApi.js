import axiosClient from "./axiosClient";

const relationshipApi = {
  addFriend: friendCode => {
    return axiosClient.get(`/add-friend?addFriendCode=${friendCode}`);
  },
  getFriendInvitations: () => {
    return axiosClient.get("/get-friend-invitations");
  },
  updateStatusRelationship: (status, relationshipId) => {
    return axiosClient.post("/update-status-relationship", {
      status,
      relationshipId
    });
  },
  getFriendOfUser: () => {
    return axiosClient.get("/get-friend-of-user");
  }
};

export default relationshipApi;
