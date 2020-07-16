import User from "../models/User";
import { respFailure, respSuccess, authenticationUser } from "../utils/server";
import { validatePassword, generateRandomPassword } from "../utils";

export const getUsers = async (req, res) => {
  return User.find()
    .then((users) => {
      return respSuccess({ message: "GET_USERS_SUCCESS", data: users }, res);
    })
    .catch((error) => {
      return respFailure({ message: "SERVER_ERROR", error }, res);
    });
};

export const registerUser = async (req, res) => {
  const { email, username, password } = req.body;

  if (!validatePassword(password))
    return respFailure({ message: "PASSWORD_INVALID" }, res);

  const existsUser = await User.findOne().or([{ username }, { email }]);
  if (existsUser) return respFailure({ message: "USER_ALREADY_EXISTS" }, res);

  const newUser = new User({
    email,
    username,
    password,
  });

  return newUser
    .save()
    .then((newUser) => {
      return respSuccess({ message: "REGISTER_SUCCESS", data: newUser }, res);
    })
    .catch((error) => {
      return respFailure({ message: "SERVER_ERROR", error }, res);
    });
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return respFailure({ message: "USERNAME_OR_PASSWORD_INVALID" }, res);

  const existsUser = await User.findOne({ username });
  if (!existsUser)
    return respFailure({ message: "USERNAME_IS_NOT_EXISTS" }, res);

  if (!(await existsUser.comparePassword(password)))
    return respFailure({ message: "PASSWORD_IS_WRONG" }, res);

  await existsUser.generateTokens();

  return existsUser
    .save()
    .then((user) => {
      return respSuccess({ message: "LOGIN_SUCCESS", data: user }, res);
    })
    .catch((error) => {
      return respFailure({ message: "SERVER_ERROR", error }, res);
    });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.query;

  if (!email) return respFailure({ message: "EMAIL_INVALID" }, res);

  const user = await User.findOne({ email });
  if (!user) return respFailure({ message: "USERNAME_IS_NOT_EXISTS" }, res);

  const newPassword = generateRandomPassword();
  user.sendMailForgotPassword(newPassword);
  user.password = newPassword;

  return user
    .save()
    .then((user) => {
      return respSuccess(
        { message: "FORGOT_PASSWORD_SUCCESS", data: user },
        res
      );
    })
    .catch((error) => {
      return respFailure({ message: "SERVER_ERROR", error }, res);
    });
};

export const getCurrentUser = async (req, res) => {
  try {
    const curUser = await authenticationUser(req, res);

    return respSuccess(
      {
        message: "GET_CURRENT_USER_SUCCESS",
        data: {
          username: curUser.username,
          status_caption: curUser.status_caption,
        },
      },
      res
    );
  } catch (error) {
    return respFailure({ message: "SERVER_ERROR", error }, res);
  }
};

export const updateStatusCaption = async (req, res) => {
  const { statusMsg } = req.body;

  if (!statusMsg)
    return respFailure({ message: "STATUS_CAPTION_INVALID", error }, res);
  const user = await authenticationUser(req, res);

  user.status_caption = statusMsg;

  return user
    .save()
    .then((user) => {
      return respSuccess(
        { message: "UPDATE_STATUS_CAPTION_SUCCESS", data: user },
        res
      );
    })
    .catch((error) => {
      return respFailure({ message: "SERVER_ERROR", error }, res);
    });
};

export const getInfoUser = async (req, res) => {
  try {
    const curUser = await authenticationUser(req, res);

    return respSuccess(
      {
        message: "GET_INFO_USER_SUCCESS",
        data: {
          id: curUser.id,
          username: curUser.username,
          email: curUser.email,
          status_caption: curUser.status_caption,
          add_friend_code: curUser.add_friend_code,
        },
      },
      res
    );
  } catch (error) {
    return respFailure({ message: "SERVER_ERROR", error }, res);
  }
};
