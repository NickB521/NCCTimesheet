import axios from "axios";

const USER_BASE_API_URL = "http://localhost:8080/api/v1/users";

export async function getAllUsers(token) { //Possibly change to pass in Bearer and token for future proofing
  return axios.get(USER_BASE_API_URL, {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  });
}

export async function getSelf(token) {
  return axios.get(USER_BASE_API_URL + "/self", {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  });
}

export async function getByEmail(token, email) {
  return axios.get(`${USER_BASE_API_URL}/email/${email}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  });
}

export async function getWorksiteUsers(token, id) {
  return axios.get(`${USER_BASE_API_URL}/worksite/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  });
}

export async function getUserById(id, token) {
  return axios.get(`${USER_BASE_API_URL}/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  });
}