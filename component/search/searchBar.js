import {StyleSheet, TextInput, View} from "react-native";
import * as React from 'react';

export default function SearchBar(props){
    return (
        <View>
            <TextInput value={props.search} onChangeText={props.setSearch} placeholder="Rechercher" style={styles.input}/>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 1,
        width:'100%',
        borderWidth: 1,
        borderRadius: 5
    }
});