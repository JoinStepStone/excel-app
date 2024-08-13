
import axios from "axios"

const BASE_URL = "http://127.0.0.1:5000"

export async function getAllStudents() {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.get(`${BASE_URL}/admin/getAllStudents`, {
        headers: {
            Authorization: `Bearer ${accessToken.token}`,
        },
      });

      return response.data
}

export async function getAllSimulations() {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.get(`${BASE_URL}/admin/getAllSimulations`, {
        headers: {
            Authorization: `Bearer ${accessToken.token}`,
        },
      });

      return response.data
}

export async function getAllUserSimulations(data) {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.post(
        `${BASE_URL}/admin/getSimulationDetails`,
        data, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken.token}`,
            },
        }
    );

      return response.data
}

export async function postSimulationsData(data) {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.post(
        `${BASE_URL}/admin/uploadFile`,
        data, 
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken.token}`,
            },
        }
    );

      return response.data
}