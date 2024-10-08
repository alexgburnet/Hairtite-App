import { View, Text, SafeAreaView, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import axios from 'axios'

import * as SecureStore from 'expo-secure-store';

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

import { SERVER_URL } from '../../config'

/**
 * Screen to handle sign in
 * 
 * @returns {JSX.Element}
*/

const signIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')  // State to handle error messages

  const handleSignIn = async () => {
    try {
      // Make a POST request to the Flask API
      const response = await axios.post(`${SERVER_URL}/login`, {
        email: form.email,
        password: form.password
      });

      // Handle successful sign-in
      if (response.status === 200) {
        // Store tokens in SecureStore
        await SecureStore.setItemAsync('access_token', response.data.access_token);
        await SecureStore.setItemAsync('refresh_token', response.data.refresh_token);

        router.replace('/home');  // Navigate to home page
      }
    } catch (error) {
      // Handle error from the Flask API
      if (error.response) {
        // The request was made and the server responded with a status code
        setErrorMessage(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage('No response from server');
      } else {
        // Something happened in setting up the request
        setErrorMessage('Error setting up request');
      }
      Alert.alert('Error', errorMessage);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      
      <View style={styles.forms}>
        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          keyboardType="email-address"
        />
        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          secureTextEntry
        />
      </View>

      <View style={styles.signin}>
        <CustomButton 
          title="Sign-in"
          handlePress={handleSignIn}
        />
        <Text style={styles.bottomtext}>Don't have an account? <Text style={styles.link} onPress={() => {router.push('about-you')}}>Sign Up</Text></Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    justifyContent: 'center',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  forms: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  signin: {
    gap: 30,
  },
  bottomtext: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-Light',
  },
  link: {
    color: 'rgb(31, 73, 133)',
  },
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    margin: 15,
    gap: 120,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  }
})

export default signIn