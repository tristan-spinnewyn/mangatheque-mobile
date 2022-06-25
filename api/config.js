import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getToken(){ return await AsyncStorage.getItem('token')}
export async function getHeader(){
    const token = await getToken();
    return {
        headers: {
            authorization: "Bearer " + token
        }
    }
}

export const url_api = 'https://mangatheque-prod.herokuapp.com';