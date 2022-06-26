import {Dimensions, Image, Text, TouchableOpacity, View} from "react-native";
import * as React from 'react';

export default function TomeComponent({navigation,id,imageCouverture,serieName,numero}){
    var width = Dimensions.get('window').width;
    return(
        <TouchableOpacity onPress={() => navigation.navigate('Tome',{
            itemId:id
        })}>
             <Image style={{
                    width: width,
                    height:'auto',
                    aspectRatio: 1, // <-- this
                    resizeMode: 'contain', //optional
             }} source={{ uri:imageCouverture}}/>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>{serieName}</Text>
                <Text>Tome n°{numero}</Text>
            </View>
        </TouchableOpacity >
    )
}