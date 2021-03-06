import {StyleSheet, Button, Text, TextInput, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState} from "react";
import {authenticate} from "../../api/userApi";
import * as React from 'react';

export default function Login(props){
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error,setError] = useState("")
    const login = async()=>{
        setError("")
        try{
            const data = await authenticate({email:email,password:password})
            await AsyncStorage.setItem('token',JSON.stringify(data.access_token))
            props.setLog(true)
        }catch (e){
            setError("Erreur d'email ou de mot passe")
        }
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login</Text>
            <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail}/>
            <TextInput placeholder="Mot de passe" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry={true}/>
            <Text>{error}</Text>
            <Button onPress={login} color="#db4a2b" title="Se connecter"/>
        </View >
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        width:200,
        borderWidth: 1,
        borderRadius: 5
    }
});