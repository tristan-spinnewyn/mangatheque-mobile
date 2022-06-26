import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import * as React from 'react';
import {getEditeurById} from "../api/editeurApi";
import {useEffect, useState} from "react";

export default function Editeur({route, navigation}){
    const { itemId, otherParam } = route.params;
    const [editeur,setEditeur]= useState(null)
    const getEditeur = async ()=>{
        const data = await getEditeurById(itemId)
        setEditeur({id:data.id,nameEditeur: data.nameEditeur,editions: data.editions})
    }
    useEffect(()=>{
        setEditeur(null)
        getEditeur()
    },[itemId])
    return(
        <View>
            <Text style={{ fontSize:30}}>{editeur ? editeur.nameEditeur : ''}</Text>
            <ScrollView style={{marginTop:10}}>
                {editeur ? editeur.editions.map((value,index)=>{
                    return (<TouchableOpacity style={{height:40, borderBottomWidth:1, borderBottomColor:'#CCCCCC'}} key={index} onPress={() => navigation.navigate('Serie',{
                        itemId:value.id
                    })}>
                        <Text>{value.serie.nameSeries} - {value.nameEdition}</Text>
                    </TouchableOpacity>)
                }): <Text>''</Text>}
            </ScrollView>
        </View>
    )
}