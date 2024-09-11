import { View, Text, SafeAreaView, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { useFormContext } from '../../contexts/FormContext'; // Adjust the path as necessary
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

import { router } from 'expo-router';

import { SERVER_URL } from '../../config'

/**
 * Screen for the user to input their password for their account
 * 
 * @returns {JSX.Element}
*/
const Password = () => {
  const { formData } = useFormContext();
  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
  });

  // Function to check if passwords match
  const doPasswordsMatch = () => {
    return (form.password === form.confirmPassword) && form.password.length > 0;
  }

  const handleRegister = async () => {
    const { password } = form;
  
    console.log('Form data:', formData);
  
    // Check if passwords match
    if (!doPasswordsMatch()) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
  
    try {
      // Get store_id from the backend
      const storeResponse = await axios.post(`${SERVER_URL}/get-store-id`, {
        country: formData.country,
        company: formData.company,
        branch: formData.branch,
      });
  
      const { store_id } = storeResponse.data;
  
      // Submit all the collected data to the Flask API
      const response = await axios.post(`${SERVER_URL}/signup`, {
        full_name: `${formData.name} ${formData.surname}`,
        email: formData.email,
        birthday: formData.DOB,
        store_id,
        password,
      });
  
      console.log('Response:', response.data);
  
      // Check if registration was successful
      if (response.status === 201) {
        // Registration successful
        router.replace('/request-sent');
      } else {
        // If the API returns a different status code
        Alert.alert('Error', response.data.message || 'Registration failed.');
      }
    } catch (error) {
      // Handle specific HTTP errors
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          Alert.alert('Error', 'Missing data. Please fill in all fields.');
        } else if (status === 409) {
          Alert.alert('Error', 'A user with this email already exists.');
        } else if (status === 404) {
          Alert.alert('Error', 'Store not found. Please check your entries.');
        } else if (status === 500) {
          Alert.alert('Error', 'Server error. Please try again later.');
        } else {
          Alert.alert('Error', data.message || 'An unknown error occurred.');
        }
      } else {
        // Handle errors not related to HTTP (e.g., network issues)
        Alert.alert('Registration failed', 'Please check your connection and try again.');
      }
  
      console.error('Error registering:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Complete Your Account!</Text>
      
      <View style={styles.forms}>
        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          secureTextEntry
        />

        <FormField
          title="Confirm Password"
          value={form.confirmPassword}
          handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
          secureTextEntry
        />
      </View>

      <View style={styles.signin}>
        <CustomButton 
          title="Submit Request"
          handlePress={handleRegister}
          style={{ opacity: doPasswordsMatch() ? 1 : 0.5 }} // Adjust opacity based on password match
          disabled={!doPasswordsMatch()} // Disable button if passwords don't match
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    justifyContent: 'center',
  },
  forms: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  signin: {
    gap: 30,
  },
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    margin: 15,
    gap: 120,
  },
});

export default Password;