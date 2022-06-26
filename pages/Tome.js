import {Text, View} from "react-native";

export default function Tome({route}){
    const { itemId, otherParam } = route.params;
    return(
        <View>
            <Text>{itemId}</Text>
        </View>
    )
}