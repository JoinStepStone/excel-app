
import axios from "axios"
import { BASE_URL } from ".";

export async function signUp(data) {

    const response = await axios.post(`${BASE_URL}/signUp`, {
        headers: {
            "Content-Type": "application/json"
        },
        data,
      });

      return response.data
}

export async function signIn(data) {

    const response = await axios.post(`${BASE_URL}/login`, 
    data,
    {
        headers: {
            "Content-Type": "application/json"
        },
      });

      return response.data
}