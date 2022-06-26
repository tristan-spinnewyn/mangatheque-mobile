import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import * as React from 'react';

export default function ChoiceSearch(props){
    const setWhatIs = (what)=>{
        if(what === 'serie'){
            props.setWhat({isSerie:true,isAuteur:false, isEditeur:false})
        }
        if(what === 'auteur'){
            props.setWhat({isSerie:false,isAuteur:true, isEditeur:false})
        }
        if(what === 'editeur'){
            props.setWhat({isSerie:false,isAuteur:false, isEditeur:true})
        }
    }
    return(
        <View style={[style.view]}>
            <TouchableOpacity onPress={()=>{setWhatIs('serie')}} style={[style.button, props.what.isSerie ? style.buttonSelect : style.buttonNotSelect]}>
                <Text style={{color:'white'}}>Série</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setWhatIs('auteur')}} style={[style.button, props.what.isAuteur ? style.buttonSelect : style.buttonNotSelect]}>
                <Text style={{color:'white'}}>Auteur</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setWhatIs('editeur')}} style={[style.button, props.what.isEditeur ? style.buttonSelect : style.buttonNotSelect]}>
                <Text style={{color:'white'}}>Editeur</Text>
            </TouchableOpacity>
        </View>
    )
}

const style =StyleSheet.create({
    buttonSelect: {
        backgroundColor:'#db4b2a'
    },
    buttonNotSelect: {
        backgroundColor: '#444447'
    },
    button:{
        width:'33%',
        alignItems:'center',
        justifyContent:'center'
    },
    view:{
        flex:1,
        flexDirection:'row',
        maxHeight:40,
        backgroundColor:'#444447'
    }
})