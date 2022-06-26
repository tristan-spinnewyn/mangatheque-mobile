import {getHeader, url_api} from "./config";
import axios from "axios";

export async function getEditor(name){
    const HEADER = await getHeader()
    let url = `${url_api}/editeurs`
    let res;
    if(name === ""){
        res = await axios.get(url)
    } else {
        url += `?name=${name}`
        res = await axios.get(url)
    }
    return res.data;
}