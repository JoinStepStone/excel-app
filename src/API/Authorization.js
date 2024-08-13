
import axios from "axios"

const BASE_URL = "http://127.0.0.1:5000"

export async function signUp(data) {

    const response = await axios.post(`${BASE_URL}/signUp`, {
        Headers: {
            "Content-Type": "application/json"
        },
        data,
      });

      return response.data
}

export async function signIn(data) {

    const response = await axios.post(`${BASE_URL}/login`, {
        Headers: {
            "Content-Type": "application/json"
        },
        data,
      });

      return response.data
}