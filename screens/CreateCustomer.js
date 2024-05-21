import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View,ActivityIndicator } from 'react-native';
import axios from 'axios';
import FormData from 'form-data';
import {useNavigation} from '@react-navigation/native';

export default function CreateCustomer() {

    const navigation = useNavigation();
    const [isModalVisible,setModalVisible] = useState(false);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const [addharNo,setAddharNo] = useState("");
    const [errors,setErrors] = useState({});
    const [authErrors,setAuthErrors] = useState([]);
    const [statusMessage,setStatusMessage] = useState("");
    const [isLoggedIn,setLoginStatus] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(() => {
        if(parseInt(localStorage.getItem('isLogin'))!=1)
        {
          setLoginStatus(false);
          navigation.navigate('Login');
        }
    });

    const valiDateForm = () => {
        setStatusMessage("");
        let errors = {};
        if(!name){
          errors.name = "Name is required";
        }
        if(!email){
          errors.email = "Email is required";
        }
        if(!phone){
            errors.phone = "Mobile number is required";
          }
        if(!address){
            errors.address = "Address is required";
          }
        if(!addharNo){
            errors.addharNo = "Addhar number is required";
          }
        setErrors(errors);
        return Object.keys(errors).length === 0 ;
      }
     
      const createUserFormSubmission = async () => {
        setAuthErrors([]);
        if(valiDateForm())
        {
            const form = new FormData();
            let uid = localStorage.getItem('uid');
            form.append('uid',uid);
            form.append('name',name);
            form.append('email',email);
            form.append('phone_number',phone);
            form.append('address',address);
            form.append('addhar_number',addharNo);

            let authToken = localStorage.getItem("auth_token");

            setIsLoading(true);
            
            const response = await axios.post(
              'http://shilpaaddy.in/koley_api/create_new_customer',
              form,
              {
                headers: {
                  'authToken': authToken
                }
              }
            );

            setIsLoading(false);
 
            if(parseInt(response.data.status)==200)
            {
                setStatusMessage(response.data.msg);
                navigation.navigate('DashBoard');
            }
            else
            {
                setStatusMessage(response.data.msg);
                setAuthErrors(response.data.errors);
            }
        }
      };
  return (
    <View style={styles.form}>
        <Text style={styles.lebel}>Name</Text>
        <TextInput style={styles.input} placeholder='Name'
        value={name}
        onChangeText={setName}/>
        {errors.name ? <Text style={styles.alert_message}>{errors.name}</Text>:null}
        <Text style={styles.lebel}>Email</Text>
        <TextInput style={styles.input} placeholder='Email' 
        value={email}
        onChangeText={setEmail}/>
        {errors.email ? <Text style={styles.alert_message}>{errors.email}</Text>:null}
        <Text style={styles.lebel}>Mobile</Text>
        <TextInput style={styles.input} placeholder='Mobile No' 
        value={phone}
        onChangeText={setPhone}/>
        {errors.phone ? <Text style={styles.alert_message}>{errors.phone}</Text>:null}
        <Text style={styles.lebel}>Address</Text>
        <TextInput style={styles.input} placeholder='Address' 
        value={address}
        onChangeText={setAddress}/>
        {errors.address ? <Text style={styles.alert_message}>{errors.address}</Text>:null}
        <Text style={styles.lebel}>Addhar Number</Text>
        <TextInput style={styles.input} placeholder='Addhar Number' 
        value={addharNo}
        onChangeText={setAddharNo}/>
         {authErrors.map(msg => {
                return (<Text style={styles.alert_message} >{msg}</Text>);
        })}
        {errors.addharNo ? <Text style={styles.alert_message}>{errors.addharNo}</Text>:null}
        {!isLoading ?
            <Button style={styles.lebel} title='Create' onPress={createUserFormSubmission}></Button>
            :
            <ActivityIndicator size="large" />
        }

       
       
        
        <Text style={styles.alert_message}>{statusMessage}</Text>
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
