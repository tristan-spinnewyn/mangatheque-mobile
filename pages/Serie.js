import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import * as React from 'react';
import {getSerieById} from "../api/serieApi";
import {optionsStatutEdition} from "../component/variable";
import {useEffect, useState} from "react";

export default function Serie({navigation, route}){
    const { itemId, otherParam } = route.params;
    const [serie,setSerie]= useState(null)
    const getSerie = async ()=>{
        const data = await getSerieById(itemId)
        setSerie(data)
    }
    useEffect(()=>{
        setSerie(null)
        getSerie()
    },[itemId])
    return(
        <View>
            <Text style={{ fontSize:30}}>{serie ? serie.nameSeries : ''}</Text>
            <View style={{ marginTop:15 }}>
                <Text style={{fontSize:20}}>Auteur</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Auteur',{
                    itemId:serie.auteur.id
                })} style={{height:40, borderBottomWidth:1, borderBottomColor:'#CCCCCC'}}>
                    <Text>{serie ? serie.auteur.nameAuteur : ''}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop:15 }}>
                <Text style={{fontSize:20}}>Editions</Text>
                <ScrollView>
                    {serie ? serie.editions.map((value,index)=>{
                        const statut = optionsStatutEdition.filter(statut => statut.value.toString() == value.statut)
                        return (<TouchableOpacity style={{height:40, borderBottomWidth:1, borderBottomColor:'#CCCCCC'}} key={index} onPress={() => navigation.navigate('Edition',{
                            itemId:value.id
                        })}>
                            <Text>{serie.nameSeries} - {value.nameEdition}</Text>
                            <Text>{value.tomes.length} tomes parus - {statut[0] ? statut[0].label : ''}</Text>
                        </TouchableOpacity>)
                    }): <Text>''</Text>}
                </ScrollView>
            </View>
        </View>
    )
}