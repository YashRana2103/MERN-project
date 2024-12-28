import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api";

export const checkOrCreateUser = async (username) => {
  const response = await axios.post(`${BASE_URL}/users/check-or-create`, {
    username,
  });
  return response.data;
};

export const getAllUsers = async (currentUsername) => {
  const response = await axios.get(`${BASE_URL}/users/all`, {
    params: { currentUsername },
  });
  return response.data;
};

export const getMessages = async (user1, user2) => {
  const response = await axios.get(`${BASE_URL}/chats/messages`, {
    params: { user1, user2 },
  });
  return response.data;
};

export const saveMessage = async (from, to, text) => {
  const response = await axios.post(`${BASE_URL}/chats/messages`, {
    from,
    to,
    text,
  });
  return response.data;
};
