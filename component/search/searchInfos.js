import {View} from "react-native";
import {useEffect, useState} from "react";
import {getAuthor} from "../../api/auteurApi";
import {getEditor} from "../../api/editeurApi";
import {getSerie} from "../../api/serieApi";
import SearchElem from "./searchElem";
import * as React from 'react';

export default function SearchInfos(props){
    const [lstElem,setLstElem] = useState([])
    const getContent = async()=>{
        setLstElem([])
        if(props.what.isAuteur){
            const autors = await getAuthor(props.search)
            for(let i = 0; i < autors.length; i++){
                setLstElem(prevState => [...prevState, {type:'Auteur',id:autors[i].id,name:autors[i].nameAuteur}])
            }
        }
        if(props.what.isSerie){
            const serie = await getSerie(props.search)
            for(let i = 0; i < serie.length; i++){
                setLstElem(prevState => [...prevState, {type:'Serie',id:serie[i].id,name:serie[i].nameSeries}])
            }
        }
        if(props.what.isEditeur){
            const editeur = await getEditor(props.search)
            for(let i = 0; i < editeur.length; i++){
                setLstElem(prevState => [...prevState, {id:editeur[i].id,type:'Editeur',name:editeur[i].nameEditeur}])
            }
        }
    }

    useEffect(()=>{
        getContent()
    },[props.search,props.what])

    return(
        <View>
            {lstElem ? lstElem.map((value,index)=>{
                return <SearchElem navigation={props.navigation} name={value.name} type={value.type} id={value.id} key={index}/>
            }):''}
        </View>
    )
}