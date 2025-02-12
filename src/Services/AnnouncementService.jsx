import axios from "axios";

const ANNOUNCEMENTS_BASE_API_URL = "http://localhost:8080/api/v1/announcements";

export async function createAnnouncement(token) {
    return axios.delete(`${ANNOUNCEMENTS_BASE_API_URL}/create`, {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    });
}

export async function updateAnnouncement(id, token) {
    return axios.delete(`${ANNOUNCEMENTS_BASE_API_URL}/update/${id}`, {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    });
}

export async function getAllAnnouncements(token) {
    return axios.get(ANNOUNCEMENTS_BASE_API_URL, {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    });
}

export async function getAnnouncementById(id, token) {
    return axios.get(`${ANNOUNCEMENTS_BASE_API_URL}/${id}`, {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    });
}

export async function deleteAnnouncement(id, token) {
    return axios.delete(`${ANNOUNCEMENTS_BASE_API_URL}/delete/${id}`, {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    });
}