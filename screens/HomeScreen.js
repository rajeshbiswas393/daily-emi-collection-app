import React from 'react'
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Home</Text>
        <Button title='Login' onPress={()=> navigation.navigate('Login') } ></Button>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'white'
    },
    form: {
      backgroundColor:'white',
      padding: 5,
      borderRadius:5,
      shadowColor: 'black',
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    lebel:
    {
      fontSize:16,
      marginBottom:5,
      frontWeight:'bold'
    },
    input:
    {
      height: 40,
      borderColor:"#ddd",
      borderWidth: 1,
      borderBottom: 15,
      padding: 10,
      borderRadius: 10
    },
    heading:
    {
      fontSize:26,
      frontWeight:'bold'
    },
    alert_message:{
      color:'red',
      marginTop:10,
      marginBottom:5
    }
  });  
