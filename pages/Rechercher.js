import {Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import ChoiceSearch from "../component/search/choiceSearch";
import SearchBar from "../component/search/searchBar";
import SearchInfos from "../component/search/searchInfos";
import * as React from 'react';

export default function Rechercher({navigation}){
    const [what,setWhat] = useState({isSerie:true,isAuteur:false,isEditeur:false})
    const [search,setSearch] = useState('')
    return (<View style={{flex:1}}>
        <ChoiceSearch what={what} setWhat={setWhat}/>
        <SearchBar search={search} setSearch={setSearch}/>
        <SearchInfos what={what} search={search} navigation={navigation}/>
    </View >)
}