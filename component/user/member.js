import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import {updateConnectedUser} from "../../api/userApi";

export default function Member(props){
    const [email,setEmail] = useState(props.email)
    const [password,setPassword] = useState('')
    const [pseudonyme,setPseudonyme] = useState(props.pseudonyme)
    const [error, setError] = useState('')
    useEffect(()=>{
        setEmail(props.email)
        setPseudonyme(props.pseudonyme)

    },[props])
    const updateUser = async()=>{
        setError("")
        if(email==='' || password === '' || pseudonyme === ''){
            setError('Veuillez remplir tout les champs')
            return;
        }
        try{
            await updateConnectedUser({email:email,pseudonyme:pseudonyme,currentPassword:password})
            setPassword("")
        }catch (e){
            setError("Le mot de passe est incorrecte")
        }
    }
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Vos informations</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail}/>
            <TextInput style={styles.input} value={pseudonyme} onChangeText={setPseudonyme}/>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry={true}/>
            <Button onPress={updateUser} color="#db4a2b" title="Modifier"/>
            <Text>{error}</Text>
        </View>
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