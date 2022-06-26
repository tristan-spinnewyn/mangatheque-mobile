import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import * as React from 'react';
import {useEffect, useState} from "react";
import {getEditionById, getNote, noteEdition} from "../api/editionApi";
import {Rating} from "react-native-ratings";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Edition({route, navigation}) {
    const {itemId, otherParam} = route.params;
    const [edition, setEdition] = useState({
        id: '',
        nameEdition: '',
        statut: '',
        editeur: {id: '', nameEditeur: ''},
        serie: {id: '', nameSeries: ''},
        tomes: [{id: '', numero: '', imageCouverture: ''}]
    })
    const [rating, setRating] = useState(0)
    const getEdition = async () => {
        const data = await getEditionById(itemId)
        var tomes = data[0].tomes
        tomes.sort(function (a, b) {
            return a.numero - b.numero;
        })
        setEdition({
            id: data[0].id, nameEdition: data[0].nameEdition, statut: data[0].statut,
            editeur: {id: data[0].editeur.id, nameEditeur: data[0].editeur.nameEditeur},
            serie: {id: data[0].serie.id, nameSeries: data[0].serie.nameSeries},
            tomes: tomes
        })
        const token = await AsyncStorage.getItem("token")
        if(token){
            const note = await getNote(itemId)
            if(note[0] !== null){
                setRating(note[0].note)
            }
        }

    }

    const handleRating = async (rate)=>{
        setRating(rate)
        const token = await AsyncStorage.getItem("token")
        if(token){
            const data = await noteEdition(itemId,rate)
        }
    }
    useEffect(()=>{
        getEdition()
    },[itemId])
    return (
        <View style={{ flex:1}}>
            <Text style={{ fontSize:25}}>{edition.serie.nameSeries} - {edition.nameEdition}</Text>
            <Rating onFinishRating={handleRating} startingValue={rating}/>
            <View style={{ marginTop:15 }}>
                <Text style={{fontSize:20}}>Série</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Serie',{
                    itemId:edition.serie.id
                })} style={{height:50, borderBottomWidth:1, borderBottomColor:'#CCCCCC'}}>
                    <Text>{edition.serie.nameSeries}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop:15 }}>
                <Text style={{fontSize:20}}>Editeur</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Editeur',{
                    itemId:edition.editeur.id
                })} style={{height:50, borderBottomWidth:1, borderBottomColor:'#CCCCCC'}}>
                    <Text>{edition.editeur.nameEditeur}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop:15, flex:1}}>
                <Text style={{fontSize:20}}>Tomes</Text>
                <ScrollView>
                    {edition.tomes.map((value,index)=>{
                        return (<TouchableOpacity style={{ borderBottomWidth:1, borderBottomColor:'#CCCCCC',alignItems:'center'}} key={index} onPress={() => navigation.navigate('Tome',{
                            itemId:value.id
                        })}>
                            <Image style={{
                                width: 300,
                                height:'auto',
                                aspectRatio: 1, // <-- this
                                resizeMode: 'contain', //optional
                            }} source={{uri: value.imageCouverture}}/>
                            <Text>{value.serieName}</Text>
                            <Text>Tome n°{value.numero}</Text>
                        </TouchableOpacity>)
                    })}
                </ScrollView>
            </View>
        </View>
    )
}