import {Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import Login from "../component/login";

export default function Account(){
    const [log,setLog] = useState(false)
    const getToken = async()=>{
        const token = await AsyncStorage.getItem('token')
        if(token){
            setLog(true)
        }else{
            setLog(false)
        }
    }
    useEffect(()=>{
        getToken()
    },[])
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {log ? <Text>Connecter</Text> : <Login/>}
        </View >
    )
}