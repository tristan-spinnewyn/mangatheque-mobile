import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import * as React from 'react';
import {getAuthorById} from "../api/auteurApi";
import {useEffect, useState} from "react";

export default function Auteur({route, navigation}){
    const { itemId, otherParam } = route.params;
    const [auteur,setAuteur]= useState(null)
    const getAuteur = async ()=>{
        const data = await getAuthorById(itemId)
        setAuteur({id:data.id,nameAuteur:data.nameAuteur,series:data.series})
    }
    useEffect(()=>{
        setAuteur(null)
       getAuteur()
    },[itemId])
    return(
        <View>
            <Text style={{ fontSize:30}}>{auteur ? auteur.nameAuteur : ''}</Text>
            <ScrollView style={{marginTop:10}}>
                {auteur ? auteur.series.map((value,index)=>{
                    return (<TouchableOpacity style={{height:40, borderBottomWidth:1, borderBottomColor:'#CCCCCC'}} key={index} onPress={() => navigation.navigate('Serie',{
                        itemId:value.id
                    })}>
                        <Text>{value.nameSeries}</Text>
                    </TouchableOpacity>)
                }): <Text>''</Text>}
            </ScrollView>
        </View>
    )
}