
import React, {useEffect, useState} from "react";
import {  View, Text, ScrollView, StyleSheet, Button, FlatList} from "react-native";
import axios from "axios";
import api from "./src/devices/api.js";

export default function App() {
  const[compromisso, setCompromisso] = useState([]);
  const[newTitulo, setNewTitulo] = useState("");
  const[newAnotacao, setNewAnotacao] = useState("");
  const[newData, setNewData] = useState("");
  const[newHora, setNewHora] = useState("");
  const[newStatus, setNewStatus] = useState("");

  const API = "http://10.110.12.19:3000/compromisso";

  async function buscarComp() {
    try{
      const response = await api.get(API);
      setCompromisso(response.data);
    }catch(error){
      console.log("Error GET:", error.message);
    } 
  }

  const addComp = async () =>{
    try{
      const response = await api.post(API,
      {titulo:newTitulo, anotacao:newAnotacao, data:newData, hora:newHora, status:newStatus }
      );
      setCompromisso([...compromisso, response.data]);
      setNewTitulo("");
      setNewAnotacao("");
      setNewData("");
      setNewHora("");
      setNewStatus("");
    }catch (error) {
      console.error("Erro POST" , error.message)
    }
  }

  const deleteComp = async (id) => {
    try {
      // Faz requisição de DELETE para excluir um usuario pelo id
      await axios.delete(`${API}/${id}`);
      // Filtra a lista de usuarios, removendo o usuario do respectivo id informado
      setCompromisso(compromisso.filter((u)=> u.id !== id));
    } catch (error) {
      console.error("Error DELETE: ", error.message)
    }

  }


  useEffect(() =>{
    buscarComp();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <FlatList 
        data={compromisso}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
        <><Text style={styles.compromisso}> {item.id} - {item.titulo} - {item.anotacao} - {item.data} - {item.hora} - {item.status} </Text><Button title="Del" onPress={() => deleteComp(item.id)} /></>
        )}
      />
    </View>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop:40,
  },
  title:{
    fontSize: 22,
    fontWeight:"bold",
    marginBottom: 10
  },
  userItem:{
    marginVertical:10
  }
});
