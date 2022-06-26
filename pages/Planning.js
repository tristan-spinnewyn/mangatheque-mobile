import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import * as React from 'react';
import {useEffect, useState} from "react";
import {getNextTome} from "../api/tomeApi";
import {useIsFocused} from "@react-navigation/native";

export default function Planning({navigation}){
    const [date,setDate] = useState([{date:new Date(),tomes:[{id:'',numero:'',nameEdition:'',nameSeries:''}]}])
    const isFocused = useIsFocused();
    const get = async ()=>{
        const data = await getNextTome()
        const dateArray = []
        for(let i = 0; i < data.length;i++){
            let obj = dateArray.find((o) => o.date === data[i].dateSortie)
            if(obj === undefined){
                dateArray.push({date:data[i].dateSortie,tomes:[{id:data[i].id,numero:data[i].numero,imageCouverture:data[i].imageCouverture,
                        nameEdition:data[i].edition.nameEdition,
                        nameSeries:data[i].edition.serie.nameSeries}]})
            }else{
                obj.tomes.push({id:data[i].id,numero:data[i].numero,imageCouverture:data[i].imageCouverture,
                    nameEdition:data[i].edition.nameEdition,
                    nameSeries:data[i].edition.serie.nameSeries})
            }
        }
        setDate(dateArray)
    }
    useEffect(()=>{
        get()
    },[isFocused])
    return (
        <ScrollView style={{flex:1}}>
            {date.map((value,index)=>{
                return(
                    <View style={{alignItems:'center'}}>
                        <Text style={{width:'100%',height:40,backgroundColor:'#222222',color:'white',textAlign: 'center'}}>{new Date(value.date).toLocaleDateString()}</Text>
                        <View>
                            {value.tomes.map((value,index)=>{
                                return (<TouchableOpacity style={{ borderBottomWidth:1, borderBottomColor:'#CCCCCC',alignItems:'center'}} key={index} onPress={() => navigation.navigate('Tome',{
                                    itemId:value.id
                                })}>
                                    <Image style={{
                                        width: 300,
                                        height:'auto',
                                        aspectRatio: 1, // <-- this
                                        resizeMode: 'contain', //optional
                                    }} source={{uri: value.imageCouverture}}/>
                                    <Text>{value.nameSeries} - {value.nameEdition}</Text>
                                    <Text>Tome n°{value.numero}</Text>
                                </TouchableOpacity>)
                            })}
                        </View>
                    </View>
                )
            })}
        </ScrollView >
    )
}