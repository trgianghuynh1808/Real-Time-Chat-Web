import { _ } from "lodash";
import jwt from "jsonwebtoken";

import User from "../models/User";
import Relationship from "../models/Relationship";
import { respFailure, respSuccess, getUserByToken } from "../utils/server";
import { validatePassword, generateRandomPassword } from "../utils";
import RESP_CODE from "../constants/resp-code";
import { authConfig } from "../config";
import { RELATIONSHIP_STATUS } from "../enums";

const { ACCEPTED } = RELATIONSHIP_STATUS;
const {
  SERVER_ERROR,

  GET_USERS_SUCCESS,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  GET_CURRENT_USER_SUCCESS,
  UPDATE_STATUS_CAPTION_SUCCESS,
  GET_INFO_USER_SUCCESS,
  UPDATE_NICK_NAME_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  GET_USER_BY_FRIEND_CODE_SUCCESS,
  REFRESH_TOKEN_SUCCESS,
  GET_FRIEND_OF_USER_SUCCESS,
  GET_USER_BY_ID_SUCCESS,

  PASSWORD_INVALID,
  USER_ALREADY_EXISTS,
  USERNAME_OR_PASSWORD_INVALID,
  USERNAME_IS_NOT_EXISTS,
  PASSWORD_IS_WRONG,
  EMAIL_INVALID,
  STATUS_CAPTION_INVALID,
  NICK_NAME_INVALID,
  ADD_FRIEND_CODE_INVALID,
  USER_IS_NOT_EXISTS,
  CANNOT_FIND_YOURSELF
} = RESP_CODE;

export const getUsers = async (req, res) => {
  return User.find()
    .then(users => {
      return respSuccess({ message: GET_USERS_SUCCESS, data: users }, res);
    })
    .catch(error => {
      return respFailure({ message: SERVER_ERROR, error }, res);
    });
};

export const registerUser = async (req, res) => {
  const { email, username, password } = req.body;

  if (!validatePassword(password))
    return respFailure({ message: PASSWORD_INVALID }, res);

  const existsUser = await User.findOne().or([{ username }, { email }]);
  if (existsUser) return respFailure({ message: USER_ALREADY_EXISTS }, res);

  const newUser = new User({
    email,
    username,
    password
  });

  return newUser
    .save()
    .then(newUser => {
      return respSuccess({ message: REGISTER_SUCCESS, data: newUser }, res);
    })
    .catch(error => {
      return respFailure({ message: SERVER_ERROR, error }, res);
    });
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return respFailure({ message: USERNAME_OR_PASSWORD_INVALID }, res);

  const existsUser = await User.findOne({ username });
  if (!existsUser) return respFailure({ message: USERNAME_IS_NOT_EXISTS }, res);

  if (!(await existsUser.comparePassword(password)))
    return respFailure({ message: PASSWORD_IS_WRONG }, res);

  const tokens = await existsUser.generateTokens();

  return existsUser
    .save()
    .then(() => {
      return respSuccess({ message: LOGIN_SUCCESS, data: tokens }, res);
    })
    .catch(error => {
      return respFailure({ message: SERVER_ERROR, error }, res);
    });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.query;

  if (!email) return respFailure({ message: EMAIL_INVALID }, res);

  const user = await User.findOne({ email });
  if (!user) return respFailure({ message: USERNAME_IS_NOT_EXISTS }, res);

  const newPassword = generateRandomPassword();
  user.sendMailForgotPassword(newPassword);
  user.password = newPassword;

  return user
    .save()
    .then(user => {
      return respSuccess({ message: FORGOT_PASSWORD_SUCCESS, data: user }, res);
    })
    .catch(error => {
      return respFailure({ message: SERVER_ERROR, error }, res);
    });
};

export const getCurrentUser = async (req, res) => {
  try {
    const curUser = await getUserByToken(req, res);

    return respSuccess(
      {
        message: GET_CURRENT_USER_SUCCESS,
        data: {
          id: curUser.id,
          username: curUser.username,
          status_caption: curUser.status_caption,
          nick_name: curUser.nick_name
        }
      },
      res
    );
  } catch (error) {
    return respFailure({ message: SERVER_ERROR, error }, res);
  }
};

export const updateStatusCaption = async (req, res) => {
  const { statusMsg } = req.body;

  if (!statusMsg)
    return respFailure({ message: STATUS_CAPTION_INVALID, error }, res);
  const user = await getUserByToken(req, res);

  user.status_caption = statusMsg;

  return user
    .save()
    .then(user => {
      return respSuccess(
        { message: UPDATE_STATUS_CAPTION_SUCCESS, data: user },
        res
      );
    })
    .catch(error => {
      return respFailure({ message: SERVER_ERROR, error }, res);
    });
};

export const getInfoUser = async (req, res) => {
  try {
    const curUser = await getUserByToken(req, res);

    return respSuccess(
      {
        message: GET_INFO_USER_SUCCESS,
        data: {
          id: curUser.id,
          username: curUser.username,
          email: curUser.email,
          status_caption: curUser.status_caption,
          add_friend_code: curUser.add_friend_code,
          nick_name: curUser.nick_name
        }
      },
      res
    );
  } catch (error) {
    return respFailure({ message: SERVER_ERROR, error }, res);
  }
};

export const updateNickNameUser = async (req, res) => {
  const { nickName } = req.body;

  if (!nickName) return respFailure({ message: NICK_NAME_INVALID, error }, res);

  const user = await getUserByToken(req, res);

  user.nick_name = nickName;

  return user
    .save()
    .then(user => {
      return respSuccess(
        { message: UPDATE_NICK_NAME_SUCCESS, data: user },
        res
      );
    })
    .catch(error => {
      return respFailure({ message: SERVER_ERROR, error }, res);
    });
};

export const changePassword = async (req, res) => {
  const { password } = req.body;

  if (!password) return respFailure({ message: PASSWORD_INVALID, error }, res);

  const user = await getUserByToken(req, res);
  user.password = password;

  return user
    .save()
    .then(user => {
      return respSuccess({ message: CHANGE_PASSWORD_SUCCESS, data: user }, res);
    })
    .catch(error => {
      return respFailure({ message: SERVER_ERROR, error }, res);
    });
};

export const getUserByFriendCode = async (req, res) => {
  const { addFriendCode } = req.query;

  if (!addFriendCode)
    return respFailure({ message: ADD_FRIEND_CODE_INVALID }, res);

  try {
    const curUser = await getUserByToken(req, res);
    const user = await User.findOne({
      add_friend_code: addFriendCode
    });

    const relationship = await Relationship.findOne({
      $or: [
        {
          user_one_id: curUser._id,
          user_two_id: user._id
        },
        { user_one_id: user._id, user_two_id: curUser._id }
      ]
    });

    if (!user) return respFailure({ message: USER_IS_NOT_EXISTS }, res);
    if (user.username === curUser.username)
      return respFailure({ message: CANNOT_FIND_YOURSELF }, res);

    return respSuccess(
      {
        message: GET_USER_BY_FRIEND_CODE_SUCCESS,
        data: {
          ...user.filterAtr(),
          status_relationship: relationship ? relationship.status : null
        }
      },
      res
    );
  } catch (error) {
    return respFailure({ message: SERVER_ERROR, error }, res);
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  const user = await User.findOne({ refresh_token: refreshToken });

  if (!user) return respFailure({ message: USER_IS_NOT_EXISTS }, res);

  try {
    await jwt.verify(refreshToken, authConfig.refreshTokenSecret);

    const token = jwt.sign(
      { email: user.email, username: user.username },
      authConfig.tokenSecret,
      {
        expiresIn: authConfig.tokenLife
      }
    );
    return respSuccess(
      {
        message: REFRESH_TOKEN_SUCCESS,
        data: { token }
      },
      res
    );
  } catch (error) {
    return respFailure({ message: SERVER_ERROR, error }, res);
  }
};

export const getFriendsOfUser = async (req, res) => {
  const user = await getUserByToken(req, res);
  let data;

  const relationships = await Relationship.find({
    status: ACCEPTED,
    $or: [
      {
        user_one_id: user._id
      },
      { user_two_id: user._id }
    ]
  });

  if (!relationships) data = [];

  const userIds = relationships.map(relationship => {
    if (relationship.user_one_id.equals(user._id))
      return relationship.user_two_id;
    else {
      return relationship.user_one_id;
    }
  });

  const friends = await User.find({ _id: { $in: userIds } });

  if (!friends) return respFailure({ message: SERVER_ERROR }, res);
  data = friends;

  return respSuccess(
    {
      message: GET_FRIEND_OF_USER_SUCCESS,
      data
    },
    res
  );
};

export const getUserById = async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await User.findOne({ id: userId });

    return respSuccess({ message: GET_USER_BY_ID_SUCCESS, data: user }, res);
  } catch (error) {
    return respFailure({ message: SERVER_ERROR, error }, res);
  }
};

export const getUserOfConverstation = async (req, res) => {
  const { userId } = req.query;
  const curUser = await getUserByToken(req, res);

  try {
    const user = await User.findOne({ id: userId });
    const curRelationship = await Relationship.findOne({
      $or: [
        {
          user_two_id: curUser._id,
          user_one_id: user._id
        },
        {
          user_two_id: user._id,
          user_one_id: curUser._id
        }
      ],
      status: ACCEPTED
    });

    return respSuccess(
      {
        message: GET_USER_BY_ID_SUCCESS,
        data: {
          relationship_id: curRelationship.id,
          username: user.username,
          nick_name: user.nick_name
        }
      },
      res
    );
  } catch (error) {
    return respFailure({ message: SERVER_ERROR, error }, res);
  }
};
