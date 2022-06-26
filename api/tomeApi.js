import {url_api} from "./config";
import axios from "axios";

export async function getLastTome(){
    const url = `${url_api}/tome/new`
    const res = await axios.get(url)

    return res.data
}