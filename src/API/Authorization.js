
import axios from "axios"
import { BASE_URL } from ".";

export async function setNewPasswordApi(data) {
    try {

        const response = await axios.post(`${BASE_URL}/setNewPassword`, 
        data,
        {
            headers: {
                "Content-Type": "application/json"
            },
            
        });

        return response.data
            
    } catch (error) {
        return {data: "", code: 400, Message: "No Token"}
    }
}

export async function verifyEmailAddressApi(data) {
    try {

        const response = await axios.post(`${BASE_URL}/verifyEmailAddress`, 
        data,
        {
            headers: {
                "Content-Type": "application/json"
            },
            
        });

        return response.data
            
    } catch (error) {
        return {data: "", code: 400, Message: "No Token"}
    }
}

export async function checkAuth(data) {
    try {
        const accessToken = JSON.parse(localStorage.getItem("accessToken"))
        const response = await axios.get(`${BASE_URL}/checkAuth`, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken.token}`,
            },
            
        });

        return response.data
            
    } catch (error) {
        return {data: "", code: 400, Message: "No Token"}
    }
}

export async function getUniListApi() {

    const response = await axios.get(`${BASE_URL}/uniListNames`, 
    {
        headers: {
            "Content-Type": "application/json"
        },
        
      });

      return response.data
}

export async function signUp(data) {

    const response = await axios.post(`${BASE_URL}/signUp`, 
    data,
    {
        headers: {
            "Content-Type": "application/json"
        },
        
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