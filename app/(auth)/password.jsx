import { View, Text, SafeAreaView, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { useFormContext } from '../../contexts/FormContext'; // Adjust the path as necessary
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

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
    const { password, confirmPassword } = form;
  
    // Check if passwords match
    if (!doPasswordsMatch()) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
  
    try {
      // Get store_id from the backend
      const storeResponse = await axios.post('http://127.0.0.1:5000/get-store-id', {
        country: formData.country,
        company: formData.company,
        branch: formData.branch,
      });
  
      const { store_id } = storeResponse.data;
  
      // Submit all the collected data to the Flask API
      const response = await axios.post('http://127.0.0.1:5000/signup', {
        full_name: `${formData.name} ${formData.surname}`,
        email: formData.email,
        birthday: formData.DOB,
        store_id,
        password,
      });
  
      if (response.data.message === 'New staff created') {
        router.replace('/request-sent');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error registering:', error);
      Alert.alert('Registration failed', 'Please try again.');
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