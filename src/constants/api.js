import axios from "axios";
import { Alert } from "react-native";

const api = axios.create({
    // baseURL:"http://localhost:3001", //Uso do emulador na maquina
    baseURL:"http://192.168.15.13:3001", //Uso emulador do expo no dispositivo
    
    timeout:10000
});

function HandleError(error){
    if(error.response?.data.error){
        Alert.alert(error.response?.data.error);
    }else{
        Alert.alert("Ocorreu um erro. Tente novamente mais tarde");
    }
}

export {api, HandleError};