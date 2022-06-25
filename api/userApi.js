import {url_api} from "./config";
import axios from "axios";

    export async function authenticate(user){
        const url = `${url_api}/auth/`
        const response = await axios.post(url,user)

        return response.data
    }
