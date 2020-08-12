import Message from "../models/Message";
import { respFailure, respSuccess, getUserByToken } from "../utils/server";
import RESP_CODE from "../constants/resp-code";

const {
  CREATE_MESSAGE_SUCCESS,
  GET_CONVERSATION_SUCCESS,
  SERVER_ERROR
} = RESP_CODE;

export const createMessage = async (req, res) => {
  const { relationshipId, message } = req.body;

  const user = await getUserByToken(req, res);

  const newMessage = new Message({
    relationship_id: relationshipId,
    sender_id: user.id,
    message
  });

  return newMessage
    .save()
    .then(newMessage => {
      return respSuccess(
        { message: CREATE_MESSAGE_SUCCESS, data: newMessage },
        res
      );
    })
    .catch(error => {
      return respFailure({ message: SERVER_ERROR, error }, res);
    });
};

export const getConversation = async (req, res) => {
  const { relationshipId } = req.query;

  try {
    const messages = await Message.find({
      relationship_id: relationshipId
    }).sort({ createdAt: "asc" });

    return respSuccess(
      { message: GET_CONVERSATION_SUCCESS, data: messages },
      res
    );
  } catch (error) {
    return respFailure({ message: SERVER_ERROR, error }, res);
  }
};
