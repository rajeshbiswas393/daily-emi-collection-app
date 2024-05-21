import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View,ActivityIndicator,Pressable} from 'react-native';
import axios from 'axios';
import FormData from 'form-data';
import {useNavigation} from '@react-navigation/native';

export default function CreateLoan() {

    const navigation = useNavigation();
    const [isModalVisible,setModalVisible] = useState(false);
    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [customerId,setCustomerId] = useState(0);
    const [searchText,setSearchText] = useState("");
    const [searchSuggession,setSearchSuggession] = useState([]);
    const [loanAmount,setLoanAmount] = useState("");
    const [errors,setErrors] = useState({});
    const [authErrors,setAuthErrors] = useState([]);
    const [statusMessage,setStatusMessage] = useState("");
    const [isLoggedIn,setLoginStatus] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [modalIsVisible,setModalVisibility] = useState(false);

    const valiDateForm = () => {
        setStatusMessage("");
        let errors = {};
        if(!name){
          errors.name = "Name is required";
        }
        if(!phone){
            errors.phone = "Mobile number is required";
          }
          if(!loanAmount){
            errors.loanAmount = "Loan amount is required";
          }
        setErrors(errors);
        return Object.keys(errors).length === 0 ;
      }
    const createLoanFormSubmission = async () => {
        if(valiDateForm())
        {
            const form = new FormData();
            let uid = localStorage.getItem('uid');
            form.append('uid',uid);
            form.append('customer_id',customerId);
            form.append('loan_amount',loanAmount);

            let authToken = localStorage.getItem("auth_token");

            setIsLoading(true);
            
            const response = await axios.post(
              'http://shilpaaddy.in/koley_api/create_new_loan',
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
              //  setAuthErrors(response.data.errors);
            }

        }
    }

    const showCustomerSuggession = async () => {
        const form = new FormData();
            let uid = localStorage.getItem('uid');
            form.append('uid',uid);
            form.append('search_text',searchText);

            let authToken = localStorage.getItem("auth_token");

            setIsLoading(true);
            
            const response = await axios.post(
              'http://shilpaaddy.in/koley_api/search_customer',
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
                setSearchSuggession(response.data.data)
            }
    }
    const chooseCustomer = (customer) =>{
        setCustomerId(customer.id);
        setName(customer.name);
        setPhone(customer.phone_number);
        setModalVisibility(false); 
    }
  return (
    <View style={styles.form}>
        <Button title='Select Customer' onPress={()=> setModalVisibility(true) }></Button>
        <Text style={styles.lebel}>Name</Text>
        <TextInput style={styles.input} placeholder='Name'
        value={name}
        onChangeText={setName}
        editable={false}
        />
        {errors.name ? <Text style={styles.alert_message}>{errors.name}</Text>:null}
        <Text style={styles.lebel}>Mobile</Text>
        <TextInput style={styles.input} placeholder='Mobile No' 
        value={phone}
        onChangeText={setPhone}
        editable={false}
        />
        {errors.phone ? <Text style={styles.alert_message}>{errors.phone}</Text>:null}
        <Text style={styles.lebel}>Loan Amount</Text>
        <TextInput style={styles.input} placeholder='Loan Amount' 
        value={loanAmount}
        onChangeText={setLoanAmount}
        keyboardType='numeric'
        />
        {errors.loanAmount ? <Text style={styles.alert_message}>{errors.loanAmount}</Text>:null}
         {authErrors.map(msg => {
                return (<Text style={styles.alert_message} >{msg}</Text>);
        })}
        {errors.addharNo ? <Text style={styles.alert_message}>{errors.addharNo}</Text>:null}
        <div style={styles.lebel}></div>
        {!isLoading ?
            <Button style={styles.lebel} title='Create' onPress={createLoanFormSubmission}></Button>
            :
            <ActivityIndicator size="large" />
        }
        <Text style={styles.alert_message}>{statusMessage}</Text>

        <Modal animationType={"slide"}
                   transparent={true}
                   visible={modalIsVisible}>
            <View>
                <View style={styles.form}>
                    <TextInput style={styles.input} placeholder='Search Customer'
                        value={searchText}
                        onChangeText={setSearchText}
                        onKeyUp = {showCustomerSuggession}
                    />
                     {searchSuggession.map(customer => {
                            return (
                                <View>
                                    <Pressable onPress={() => {chooseCustomer(customer)}}>
                                        <Text>{customer.name} - {customer.phone_number}</Text>
                                    </Pressable>
                                </View>
                            );
                    })}
                </View>
                <Button title="Close" onPress={()=> setModalVisibility(false) } ></Button>
            </View>
        </Modal>
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
