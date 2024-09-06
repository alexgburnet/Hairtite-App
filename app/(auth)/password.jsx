import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

/**
 * Screen for the user to input their password for their account
 * 
 * @returns {JSX.Element}
*/

const password = () => {

  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
  })

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Complete Your Account!</Text>
      
      <View style={styles.forms}>

        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e})}
        />

        <FormField
          title="Confirm Password"
          value={form.confirmPassword}
          handleChangeText={(e) => setForm({ ...form, confirmPassword: e})}
        />

      </View>

      <View style={styles.signin}>
        <CustomButton 
          title="Submit Request"
          handlePress={() => {router.replace('/request-sent')}}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    justifyContent: 'center'
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
    fontSize: 18
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

export default password