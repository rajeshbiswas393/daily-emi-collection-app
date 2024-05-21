import React from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function DashBoard() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <Button style={styles.lebel} title='Create Customer' onPress={()=> navigation.navigate('CreateCustomer') } ></Button>
        <div style={styles.lebel}></div>
        <Button style={styles.lebel} title='Create New Loan' onPress={()=> navigation.navigate('CreateLoan') } ></Button>
        <div style={styles.lebel}></div>
        <Button style={styles.lebel} title='Collect Daily EMI' onPress={()=> navigation.navigate('CreateCustomer') } ></Button>
        <div style={styles.lebel}></div>
        <Button style={styles.lebel} title='Customer Collection History' onPress={()=> navigation.navigate('CreateCustomer') } ></Button>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding:10
    },
    form: {
      backgroundColor:'white',
      padding: 5,
      borderRadius:5,
      shadowColor: 'black',
      shadowOpacity: 0.25,
      shadowRadius: 4
    },
    lebel:
    {
      fontSize:16,
      marginTop:10,
      frontWeight:'bold',
      marginBottom:10,
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
