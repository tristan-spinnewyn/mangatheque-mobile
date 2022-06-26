import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import * as React from 'react';
import {useEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import {getTomeUserApi} from "../api/tomeApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Collection({navigation}){
    const [edition,setEdition] = useState([{id:'',nameEdition:'',nbtome:0,nbtomeshas:0,nameSerie:''}])
    const [isConnected,setIsConnected] = useState(false)
    const isFocused = useIsFocused();
    const getTomes = async ()=>{
        const token = await AsyncStorage.getItem('token')
        if(token) {
            setIsConnected(true)
            const data = await getTomeUserApi()
            let editions = []
            for (let i = 0; data.length > i; i++) {
                let obj = editions.find((o) => o.id === data[i].tome.edition.id)
                if (obj === undefined) {
                    editions.push({
                        id: data[i].tome.edition.id,
                        nameEdition: data[i].tome.edition.nameEdition,
                        nbtome: data[i].tome.edition.tomes.length,
                        nbtomeshas: 1,
                        nameSerie: data[i].tome.edition.serie.nameSeries
                    })
                } else {
                    obj.nbtomeshas += 1
                }
            }
            setEdition(editions)
        }
    }
    useEffect(()=>{
        getTomes()
    },[isFocused])
    return (
        <View style={{flex:1}}>
            <Text style={{fontSize:20}}>Editions dans vote collection</Text>
            {isConnected ?
            <ScrollView style={{marginTop:10, flex:1}}>
                {edition.map((value,index)=>{
                    return <TouchableOpacity  style={{ height:50, borderBottomWidth:1, borderBottomColor:'#CCCCCC',alignItems:'center'}} key={index}
                                              onPress={() => navigation.navigate('Edition',{itemId:value.id})}>
                        <Text style={{ color:'red'}}>{value.nameSerie} - {value.nameEdition}</Text>
                        <Text>{value.nbtomeshas}/{value.nbtome} tomes</Text>
                    </TouchableOpacity>
                })}
            </ScrollView> : <Text>Vous devez être connecter pour utiliser cette fonctionnalité.</Text>}
        </View >
    )
}