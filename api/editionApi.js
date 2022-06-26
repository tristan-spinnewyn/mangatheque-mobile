import {getHeader, url_api} from "./config";
import axios from "axios";

export async function getEditionById(id){
    const url = `${url_api}/edition/${id}`
    const res = await axios.get(url)

    return res.data
}

export async function noteEdition(id,note){
    const HEADER = await getHeader()
    const url = `${url_api}/edition/${id}/add`
    const res = await axios.post(url,{note:note},HEADER)

    return res.status
}

export async function getNote(id){
    const HEADER = await getHeader()
    const url = `${url_api}/edition/${id}/getNote`
    const res = await axios.get(url,HEADER)

    return res.data
}
