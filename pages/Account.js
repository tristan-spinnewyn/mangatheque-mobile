import {Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import Login from "../component/user/login";
import User from "../component/user/user";

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
            {log ? <User setLog={setLog}/> : <Login setLog={setLog}/>}
        </View >
    )
}