import axios from "axios";

const HOLIDAYS_BASE_API_URL = "http://localhost:8080/api/v1/holidays";

export async function getAllHolidays(token) {
  return axios.get(HOLIDAYS_BASE_API_URL, {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  });
}

export async function getHolidayById(token, id) {
  return axios.get(`${HOLIDAYS_BASE_API_URL}/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  });
}