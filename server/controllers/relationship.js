import Relationship from "../models/Relationship";
import User from "../models/User";
import { respFailure, respSuccess, authenticationUser } from "../utils/server";
import { RELATIONSHIP_STATUS } from "../enums";

const { PENDING } = RELATIONSHIP_STATUS;

export const getAllFriends = async (req, res) => {
  return Relationship.find()
    .then((relationships) => {
      return respSuccess(
        { message: "GET_RELATIONSHIPS_SUCCESS", data: relationships },
        res
      );
    })
    .catch((error) => {
      return respFailure({ message: "SERVER_ERROR", error }, res);
    });
};

export const addFriend = async (req, res) => {
  const { addFriendCode } = req.query;

  const curUser = await authenticationUser(req, res);
  const friend = await User.findOne({ add_friend_code: addFriendCode });

  if (!friend) {
    return respFailure({ message: "ADD_FRIEND_CODE_INVALID" }, res);
  }

  const newRelationship = new Relationship({
    user_one_id: curUser.id,
    user_two_id: friend.id,
    status: PENDING,
    action_user_id: curUser.id,
  });

  return newRelationship
    .save()
    .then((relationship) => {
      return respSuccess(
        { message: "ADD_FRIEND_SUCCESS", data: relationship },
        res
      );
    })
    .catch((error) => {
      return respFailure({ message: "SERVER_ERROR", error }, res);
    });
};

export const updateStatusRelationship = async (req, res) => {
  const { relationshipId, status } = req.body;
  const relationship = await Relationship.findOne({ id: relationshipId });

  if (!relationship || !status) {
    return respFailure({ message: "RELATIONSHIP_IS_NOT_EXISTS" }, res);
  }

  const curUser = await authenticationUser(req, res);

  relationship.action_user_id = curUser.id;
  relationship.status = status;

  return relationship
    .save()
    .then((relationship) => {
      return respSuccess(
        { message: "UPDATE_STATUS_SUCCESS", data: relationship },
        res
      );
    })
    .catch((error) => {
      return respFailure({ message: "SERVER_ERROR", error }, res);
    });
};
