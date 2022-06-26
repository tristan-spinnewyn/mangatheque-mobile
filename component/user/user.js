import {useEffect, useState} from "react";
import {Button, View} from "react-native";
import Member from "./member";
import {getConnectedUser} from "../../api/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UpdatePwd from "./updatePwd";
import * as React from 'react';

export default function User(props){
    const [email,setEmail] = useState('')
    const [pseudonyme,setPseudonyme] = useState('')

    const getUser = async()=>{
        const data = await getConnectedUser()
        setEmail(data.email)
        setPseudonyme(data.pseudonyme)
    }
    useEffect(()=>{
        getUser()
    },[])

    const disconnect = async()=>{
        await AsyncStorage.removeItem('token')
        props.setLog(false)
    }


    return (
        <View>
            <Member email={email} pseudonyme={pseudonyme}/>
            <UpdatePwd email={email} pseudonyme={pseudonyme}/>
            <Button title="Ce deconnecter" onPress={disconnect}/>
        </View>
    )
}