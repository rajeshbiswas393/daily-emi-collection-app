import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import FormData from 'form-data';
import {useNavigation} from '@react-navigation/native';


export default function LoginScreen() {
    const navigation = useNavigation();
    const [isModalVisible,setModalVisible] = useState(false);
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [errors,setErrors] = useState({});
    const [statusMessage,setStatusMessage] = useState("");
    const [isLoggedIn,setLoginStatus] = useState(false);

    useEffect(() => {
        if(parseInt(localStorage.getItem('isLogin'))==1)
        {
          setLoginStatus(true);
          navigation.navigate('DashBoard');
        }
    });
  
    const valiDateForm = () => {
      setStatusMessage("");
      let errors = {};
      if(!userName){
        errors.userName = "Username is required"
      }
      if(!password){
        errors.password = "Password is required"
      }
      setErrors(errors);
      return Object.keys(errors).length === 0 ;
    }
   
    const loginFormubmission = async () => {
      try {
        setStatusMessage("");
  
        if(valiDateForm())
        {
          const form = new FormData();
          form.append('user_name',userName);
          form.append('password',password);
          
          const response = await axios.post(
            'http://shilpaaddy.in/koley_api/user_login',
            form,
            {
              headers: {
                'apiKey': '11ZrXaYCyUiqYC@Ki&3W7fbMhl1v*Z'
              }
            }
          );
  
          console.log(response.data.status);
          if(parseInt(response.data.status)==200)
          {
            localStorage.setItem('isLogin',1);
            localStorage.setItem('auth_token',response.data.auth_token);
            localStorage.setItem('uid',response.data.uid);
          }
          setModalVisible(true);
          setStatusMessage(response.data.msg);
          setErrors({});
          setUserName("");
          setPassword("");
        }
       
      } catch (error) {
        console.error('Error:', error);
        setStatusMessage(error);
      }
    };
  return (
    <View  style={styles.container}>
    {!isLoggedIn ?
        <View style={styles.form}>
            <Text style={styles.lebel}>Username</Text>
            <TextInput style={styles.input} placeholder='Enter username'
            value={userName}
            onChangeText={setUserName}/>
            {errors.userName ? <Text style={styles.alert_message}>{errors.userName}</Text>:null}
            <Text style={styles.lebel}> Password</Text>
            <TextInput style={styles.input} placeholder='Enter password' 
            secureTextEntry 
            value={password}
            onChangeText={setPassword}/>
            {errors.password ? <Text style={styles.alert_message}>{errors.password}</Text>:null}
            <Button style={styles.lebel} title='Login' onPress={loginFormubmission}></Button>
            <Text style={styles.alert_message}>{statusMessage}</Text>
        </View>
    :
      <View>
        <Text>You are logged in</Text>
      </View>
    }
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
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
      marginBottom:5,
      frontWeight:'bold',
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