import {getHeader, url_api} from "./config";
import axios from "axios";

export async function authenticate(user) {
    const url = `${url_api}/auth/`
    const response = await axios.post(url, user)

    return response.data
}
export async function updateConnectedUser(user){
    const HEADER = await getHeader()
    const url = `${url_api}/users`
    const response = await axios.put(url, user,HEADER)

    return response.data
}

export async function updatePasswordConnectedUser(user){
    const HEADER = await getHeader()
    const url = `${url_api}/users`
    const response = await axios.put(url, user,HEADER)

    return response.data
}

export async function getConnectedUser(){
    const HEADER = await getHeader()
    const url = `${url_api}/users/connected`
    const res = await axios.get(url,HEADER)

    return res.data
}