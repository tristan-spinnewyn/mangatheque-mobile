import {getHeader, url_api} from "./config";
import axios from "axios";

export async function getLastTome(){
    const url = `${url_api}/tome/new`
    const res = await axios.get(url)

    return res.data
}
export async function addTomeInCollection(id){
    const HEADER = await getHeader()
    const url = `${url_api}/tome/${id}/add`
    const res = await axios.post(url,null,HEADER)

    return res.data
}

export async function delTomeInCollection(id){
    const HEADER = await getHeader()
    const url = `${url_api}/tome/${id}/delete`
    const res = await axios.delete(url,HEADER)

    return res.data
}

export async function getTomeInCollection(id){
    const HEADER = await getHeader()
    const url = `${url_api}/tome/${id}/collection`
    const res = await axios.get(url,HEADER)

    return res.data
}

export async function getTomeUserApi(){
    const HEADER = await getHeader()
    const url = `${url_api}/tome/collection`
    const res = await axios.get(url,HEADER)

    return res.data
}

export async function getNextTome(){
    const url = `${url_api}/tome/next`
    const res = await axios.get(url)

    return res.data
}
export async function getTomeById(id){
    const url = `${url_api}/tome/${id}`
    const res = await axios.get(url)

    return res.data
}