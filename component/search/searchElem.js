import {Text, TouchableOpacity, View} from "react-native";
import * as React from 'react';

export default function SearchElem({navigation,name,type,id}){
    return(
        <TouchableOpacity onPress={() => navigation.navigate(type,{
            itemId:id
        })} style={{height:40, borderBottomWidth:1, borderBottomColor:'#CCCCCC'}}>
            <Text>{name}</Text>
        </TouchableOpacity>
    )
}