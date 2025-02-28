import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { styles } from "../ride/ride.style.js";
import icons from "../../constants/icons.js";
import { useCallback, useEffect, useState } from "react";
import { api, HandleError } from "../../constants/api.js";
import { useFocusEffect } from "@react-navigation/native";


function Ride(props){
    const userId = 1; // Isso aqui vai vir do login do usuario logado
    const [rides, setRides] = useState([]);
   

    function ClickRide(id) {
        props.navigation.navigate("ride-detail", {
            rideId: id,
            userId: userId
        });
    }

    async function RequestRide(){

        try {
            const response = await api.get("/rides/drivers/" + userId);

            if(response.data)             
                setRides(response.data);
          
        } catch (error) {
            HandleError(error);           
        }  
    }

    useFocusEffect( 
        useCallback( () =>{
            RequestRide();
        }, [])
    );


    return(
        <View style={styles.container}>
            <FlatList 
            data={rides}
            keyExtractor={(ride) => ride.ride_id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
                <TouchableOpacity style={styles.ride} onPress={() => ClickRide(item.ride_id) }>
                    <View style={styles.containerName}>
                        {
                            item.driver_user_id == userId &&  <Image source={icons.car} style={styles.car}/>
                        }
                       
                        <Text style={styles.name}>{item.passenger_name}</Text>
                    </View>                   
                      <Text style={styles.address}>Origem: {item.pickup_address}</Text>
                      <Text style={styles.address}>Destino: {item.dropoff_address}</Text>
                </TouchableOpacity>               
            )}            
            />        
        </View>           
        
    )
}

export default Ride;