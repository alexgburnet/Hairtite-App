import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

import { firebase } from '../../firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';  // Updated import for Firebase v9+

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

  const auth = getAuth();

  const handleLogin = () => {
    const { email, password } = form;

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)  // Use Firebase v9+ method
        .then((userCredential) => {
          router.replace('/home'); 
        })
        .catch((error) => {
          Alert.alert('Login Failed', error.message);
        });
    } else {
      Alert.alert('Error', 'Please fill out both email and password.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      
      <View style={styles.forms}>

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e})}
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e})}
        />

      </View>

      <View style={styles.signin}>
        <CustomButton 
          title="Sign-in"
          handlePress={handleLogin}
        />
        <Text style={styles.bottomtext}>Dont have an account? <Text style={styles.link} onPress={() => {router.push('about-you')}}>Sign Up</Text></Text>
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
    color: 'rgb(31, 73, 133)'
  },
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    margin: 15,
    gap: 120,
  }
})

export default signIn