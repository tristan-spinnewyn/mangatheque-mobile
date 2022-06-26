import {Dimensions, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import * as React from 'react';
import {useEffect, useState} from "react";
import {addTomeInCollection, delTomeInCollection, getTomeById, getTomeInCollection} from "../api/tomeApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Tome({route,navigation}){
    const { itemId, otherParam } = route.params;
    const width = Dimensions.get('window').width
    const [tome,setTome] = useState({id:'',numero:'',desc:'',nbpage:'',dateSortie:new Date(),imageCouverture:'',isbn:'',
        edition:{id:'',nameEdition:'',statut:'',serie:{id:'',nameSeries:''},
            avis:[{id:'',commantaire:'',signalee:'',user:{pseudonyme:''}}]}
    })
    const [collection,setCollection] = useState(false)
    const getTome = async () => {
        const data = await getTomeById(itemId)
        await getTomeCollection()
        setTome(data[0])

    }
    const getTomeCollection = async()=>{
        const token = AsyncStorage.getItem('token')
        if(token){
            const data = await getTomeInCollection(itemId)
            if(data[0]){
                setCollection(true)
            }
        }
    }
    const addTome = async()=>{
        const token = AsyncStorage.getItem('token')
        if(token){
            await addTomeInCollection(itemId)
            setCollection(true)
        }
    }
    const delTome = async()=>{
        const token = AsyncStorage.getItem('token')
        if(token){
            await delTomeInCollection(itemId)
            setCollection(false)
        }
    }
    useEffect(()=>{
        getTome()
    },[itemId])
    return(
        <View style={{flex:1}}>
            <Text style={{ fontSize:25}}>{tome.edition.serie.nameSeries} - Tome n°{tome.numero}</Text>
            {collection ? <TouchableOpacity style={{backgroundColor:'#db4a2b', height:40,width:300, justifyContent:'center',alignItems:"center"}} onPress={delTome}><Text>Supprimer le tome !</Text></TouchableOpacity> :
                <TouchableOpacity onPress={addTome} style={{backgroundColor:'#db4a2b', height:40,width:300, justifyContent:'center',alignItems:"center"}}><Text>Ajouter le tome !</Text></TouchableOpacity>}
            <View style={{ marginTop:15 }}>
                <Text style={{fontSize:20}}>Série</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Serie',{
                    itemId:tome.edition.serie.id
                })} style={{height:50, borderBottomWidth:1, borderBottomColor:'#CCCCCC'}}>
                    <Text>{tome.edition.serie.nameSeries}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop:15 }}>
                <Text style={{fontSize:20}}>Edition</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Edition',{
                    itemId:tome.edition.id
                })} style={{height:50, borderBottomWidth:1, borderBottomColor:'#CCCCCC'}}>
                    <Text>{tome.edition.nameEdition}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{flex:1,width:width}}>
                <View style={{justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{
                        width: width * 0.5,
                        height:'auto',
                        aspectRatio: 1, // <-- this
                        resizeMode: 'contain', //optional
                    }} source={{uri: tome.imageCouverture}}/>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Synopsis: {tome.desc}</Text>
                    <Text>ISBN: {tome.isbn}</Text>
                    <Text>Date de sortie: {new Date(tome.dateSortie).toLocaleDateString()}</Text>
                    <Text>Nombre de page: {tome.nbpage}</Text>
                </View>
            </ScrollView>
        </View>
    )
}