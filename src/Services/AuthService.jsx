import axios from "axios";

const AUTH_BASE_API_URL = "http://localhost:8080/api/v1/auth";

export async function authenticate(email, pass) {
    return axios.post(AUTH_BASE_API_URL, {
        email: email,
        password: pass
    })
}

export async function register(email, pass) { //THIS IS WORK IN PROGRESS AND SHOULD NOT BE CALLED WHEN COMPLETED UNTIL READY
    return axios.post(`${AUTH_BASE_API_URL}/register`, {
        email: email,
        password: pass
    })
}