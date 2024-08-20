
import axios from "axios"
import { BASE_URL } from ".";


export async function updateMeById(data) {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.post(`${BASE_URL}/student/updateMe`, 
        data, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken.token}`,
            },
      });

      return response.data
}

export async function getMeById() {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.post(`${BASE_URL}/student/getMe`, 
        {"userId": accessToken._id}, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken.token}`,
            },
      });

      return response.data
}

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

export async function updateSharingScoreApi(data) {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.post(
        `${BASE_URL}/student/updateSharingScore`,
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

export async function fileDeleteHandlerAPI(data) {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.post(
        `${BASE_URL}/student/fileDeleteHandler`,
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

export async function postSimulationClassCodeAndSimulation(classCode) {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.post(
        `${BASE_URL}/student/simulation/select`,
        {"classCode":classCode, "userId": accessToken._id}, 
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