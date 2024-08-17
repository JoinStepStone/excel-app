
import axios from "axios"
import { BASE_URL } from ".";

export async function deleteSimulationById(data) {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.post(`${BASE_URL}/admin/deleteSimulationById`, 
        data, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken.token}`,
            },
      });

      return response.data
}

export async function deleteStudentById(data) {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.post(`${BASE_URL}/admin/deleteStudentById`, 
        data, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken.token}`,
            },
      });

      return response.data
}

export async function getSimulationById(data) {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.post(`${BASE_URL}/admin/getSimulationById`, 
        data, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken.token}`,
            },
      });

      return response.data
}

export async function updateStudentById(data) {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.post(`${BASE_URL}/admin/updateStudentById`, 
        data, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken.token}`,
            },
      });

      return response.data
}

export async function updateAdminById(data) {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.post(`${BASE_URL}/admin/updateStudentById`, 
        data, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken.token}`,
            },
      });

      return response.data
}

export async function getAdminById(data) {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.get(`${BASE_URL}/admin/getAdminById`, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken.token}`,
            },
      });

      return response.data
}

export async function getStudentById(data) {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.post(`${BASE_URL}/admin/getStudentById`, 
        data, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken.token}`,
            },
      });

      return response.data
}

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

export async function updateSimulationsData(data) {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.post(
        `${BASE_URL}/admin/update/uploadFile`,
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

export async function downloadFileAPI(data) {

    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const response = await axios.post(
        `${BASE_URL}/admin/downloadSimulationFile`,
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