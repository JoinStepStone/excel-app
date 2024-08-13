
import axios from "axios"

const BASE_URL = "http://127.0.0.1:5000"


export async function getAllSimulations() {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.post(`${BASE_URL}/student/getsimulation/select`, 
        {"userId": accessToken._id},
        {
            headers: {
                Authorization: `Bearer ${accessToken.token}`,
            },
      });

      return response.data
}

export async function getSimulationDetails(simulationId) {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.post(
        `${BASE_URL}/student/getsimulationDetail`,
        {"simulationId":simulationId, "userId": accessToken._id}, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken.token}`,
            },
        }
    );

      return response.data
}

export async function getSimulationClassCode(data) {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.post(
        `${BASE_URL}/student/classCodeSimulation`,
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

export async function postSimulationClassCodeAndSimulation(simulationId) {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.post(
        `${BASE_URL}/student/simulation/select`,
        {"simulationId":simulationId, "userId": accessToken._id}, 
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
        `${BASE_URL}/student/simulation/upload`,
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