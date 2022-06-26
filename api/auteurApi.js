import {getHeader, url_api} from "./config";
import axios from "axios";

export async function getAuthor(name){
    const HEADER = await getHeader()
    let url = `${url_api}/auteurs`
    let res;
    if(name === ""){
        res = await axios.get(url)
    } else {
        url += `?name=${name}`
        res = await axios.get(url)
    }
    return res.data;
}

export async function getAuthorById(id){
    const url = `${url_api}/auteurs/${id}`
    const res = await axios.get(url)

    return res.data[0];
}