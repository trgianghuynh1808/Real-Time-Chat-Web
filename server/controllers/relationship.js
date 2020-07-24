import Relationship from "../models/Relationship";
import User from "../models/User";
import { respFailure, respSuccess, getUserByToken } from "../utils/server";
import { RELATIONSHIP_STATUS } from "../enums";
import RESP_CODE from "../constants/resp-code";

const { PENDING } = RELATIONSHIP_STATUS;
const {
  SERVER_ERROR,

  UPDATE_STATUS_SUCCESS,
  GET_RELATIONSHIPS_SUCCESS,
  ADD_FRIEND_SUCCESS,
  GET_FRIEND_INVITATIONS,

  ADD_FRIEND_CODE_INVALID,
  RELATIONSHIP_IS_NOT_EXISTS,
} = RESP_CODE;

export const getAllFriends = async (req, res) => {
  return Relationship.find()
    .then((relationships) => {
      return respSuccess(
        { message: GET_RELATIONSHIPS_SUCCESS, data: relationships },
        res
      );
    })
    .catch((error) => {
      return respFailure({ message: SERVER_ERROR, error }, res);
    });
};

export const addFriend = async (req, res) => {
  const { addFriendCode } = req.query;

  const curUser = await getUserByToken(req, res);
  const friend = await User.findOne({ add_friend_code: addFriendCode });

  if (!friend) {
    return respFailure({ message: ADD_FRIEND_CODE_INVALID }, res);
  }

  const newRelationship = new Relationship({
    user_one_id: curUser._id,
    user_two_id: friend._id,
    status: PENDING,
    action_user_id: curUser.id,
  });

  return newRelationship
    .save()
    .then((relationship) => {
      return respSuccess(
        { message: ADD_FRIEND_SUCCESS, data: relationship },
        res
      );
    })
    .catch((error) => {
      return respFailure({ message: SERVER_ERROR, error }, res);
    });
};

export const updateStatusRelationship = async (req, res) => {
  const { relationshipId, status } = req.body;
  const relationship = await Relationship.findOne({ id: relationshipId });

  if (!relationship || !status) {
    return respFailure({ message: RELATIONSHIP_IS_NOT_EXISTS }, res);
  }

  const curUser = await getUserByToken(req, res);

  relationship.action_user_id = curUser.id;
  relationship.status = status;

  return relationship
    .save()
    .then((relationship) => {
      return respSuccess(
        { message: UPDATE_STATUS_SUCCESS, data: relationship },
        res
      );
    })
    .catch((error) => {
      return respFailure({ message: SERVER_ERROR, error }, res);
    });
};

export const getFriendInvitations = async (req, res) => {
  const user = await getUserByToken(req, res);

  return Relationship.find({
    action_user_id: { $ne: user.id },
    $or: [
      {
        user_two_id: user._id,
      },
      { user_one_id: user._id },
    ],
    status: PENDING,
  })
    .populate("user_one_id")
    .populate("user_two_id")
    .exec((err, data) => {
      if (err) return respFailure({ message: SERVER_ERROR, err }, res);

      return respSuccess({ message: GET_FRIEND_INVITATIONS, data }, res);
    });
};
