import {Text, View} from "react-native";
import * as React from 'react';

export default function Tome({route}){
    const { itemId, otherParam } = route.params;
    return(
        <View>
            <Text>{itemId}</Text>
        </View>
    )
}