import {getHeader, url_api} from "./config";
import axios from "axios";

export async function getSerie(name){
    let url = `${url_api}/series`
    let res;
    if(name === ""){
        res = await axios.get(url)
    } else {
        url += `?name=${name}`
        res = await axios.get(url)
    }
    return res.data;
}

export async function getSerieById(id){
    const url = `${url_api}/series/${id}`
    const res = await axios.get(url)

    return res.data[0];
}