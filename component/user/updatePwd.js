import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import {updateConnectedUser, updatePasswordConnectedUser} from "../../api/userApi";

export default function UpdatePwd(props){
    const [email,setEmail] = useState(props.email)
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [pseudonyme,setPseudonyme] = useState(props.pseudonyme)
    const [error, setError] = useState('')
    useEffect(()=>{
        setEmail(props.email)
        setPseudonyme(props.pseudonyme)
    },[props])
    const updatePassword = async()=>{
        setError("")
        if(newPassword==='' || password === '' || confirmPassword === ''){
            setError('Veuillez remplir tout les champs')
            return;
        }
        if(newPassword !== confirmPassword){
            setError("Les deux mots de passe doivent être identique")
            return;
        }
        try{
            await updatePasswordConnectedUser({email:email,pseudonyme:pseudonyme,currentPassword:password,password:newPassword,changePassword: true})
            setPassword("")
            setConfirmPassword("")
            setNewPassword("")
        }catch (e){
            setError("Le mot de passe est incorrecte")
        }
    }
    return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Changer votre mot de passe</Text>
        <TextInput style={styles.input} value={newPassword} onChangeText={setNewPassword} secureTextEntry={true}/>
        <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true}/>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry={true}/>
        <Button onPress={updatePassword} color="#db4a2b" title="Modifier"/>
        <Text>{error}</Text>
    </View>)
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