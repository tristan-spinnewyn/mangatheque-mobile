import {getHeader, url_api} from "./config";
import axios from "axios";

export async function getSerie(name){
    const HEADER = await getHeader()
    let url = `${url_api}/series`
    let res;
    if(name === ""){
        res = await axios.get(url,HEADER)
    } else {
        url += `?name=${name}`
        res = await axios.get(url,HEADER)
    }
    return res.data;
}