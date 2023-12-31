import axios from "axios";
import store from "../reducers/store";
import { domain } from "../constants/ipconfig";

const handleErrors = async (error) => {
  throw error;
};

const apiService = {
  get(url) {
    return axios
      .get(domain + url, {
        headers: getHeaders(),
      })
      .catch(handleErrors);
  },

  post(url, body) {
    return axios
      .post(domain + url, body, {
        headers: getHeaders(),
      })
      .catch(handleErrors);
  },

  put(url, body) {
    return axios
      .put(url, body, {
        headers: getHeaders(),
      })
      .catch(handleErrors);
  },

  delete(url) {
    return axios
      .delete(url, {
        headers: getHeaders(),
      })
      .catch(handleErrors);
  },
};

function getHeaders() {
  const token = store.getState().user.token;

  const headers = {
    "Content-Type": "application/json",
    ...(token !== undefined ? { Authorization: `Bearer ${token}` } : {}),
  };

  return headers;
}

export default apiService;
