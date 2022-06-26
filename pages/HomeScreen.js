import {ScrollView, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {getLastTome} from "../api/tomeApi";
import TomeComponent from "../component/home/tomeComponent";

export default function HomeScreen({navigation}){
    const [tomes,setTomes] = useState(null)
    const getTomes = async()=>{
        const data = await getLastTome()
        setTomes(data)
    }
    useEffect(()=>{
        getTomes()
    },[])
    return (
        <ScrollView  style={{flex:1 , flexDirection: "row", flexWrap: "wrap"}}>
            {tomes ? tomes.map((value,index)=>{
                return <TomeComponent key={index} id={value.id} numero={value.numero} imageCouverture={value.imageCouverture} navigation={navigation} serieName={value.edition.serie.nameSeries} />
            }) : <Text>''</Text>}
        </ScrollView>
    )
}