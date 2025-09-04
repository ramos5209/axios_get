import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import api from './src/devices/api.js';

//Declaraçao do componente principal da aplicaçao 'App'
export default function App() {
  //'users' e 'setUsers' são a variavel de estado e a funçao que altera o estado
  const [users, setUsers] = useState([]);

  const API = "http://10.110.12.42:3000/users";

  //Função assincrona para buscar os dados da API
  // 'async/await - simplica o acesso ao serviço de API
  async function fetchUsers(){
    try{
      // faz uma requisição GET para a URL da API
      const response = await api.get(API);
      // Se bem sucedida a chamada da API carrega a lista dos dados
      setUsers(response.data);
    }catch(error){
      // Se a chamada falhar, exibe o erro no console
      console.error("Error GET:", error.message);
    }
  }

  // useEffect - executa a funçao fetchUsers quando o componente é montado
  useEffect(() => {
    fetchUsers();
  }, []);

  const _render = () => {

    const vet = [];


    users.map((item, index)=>{
      vet.push(
        <View key={index}>
          <Text style={styles.item}>ID: {item.id} Nome: {item.nome} Email: {item.email}</Text>
          
        </View>
      )
    })
    return vet;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GET - Lista de Usuários</Text>
      <Button title='Recarregar Lista' onPress={fetchUsers}/>
      <ScrollView>
        {_render()}
      </ScrollView>
      
    </View>
  )
    //fim do componente (return

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title:{
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item:{
    fontSize: 12,
    marginTop: 10
  }
});
