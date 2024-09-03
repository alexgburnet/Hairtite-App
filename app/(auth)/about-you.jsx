import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'

import FormField from '../../components/FormField'
import DateField from '../../components/DateField';
import CustomButton from '../../components/CustomButton'

/**
 * Screen for the user to input their personal information for their account
 * 
 * @returns {JSX.Element}
*/

const aboutYou = () => {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    DOB: '',
  })

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>About You</Text>
      
      <View style={styles.forms}>

        <FormField
          title="Name"
          value={form.name}
          handleChangeText={(e) => setForm({ ...form, name: e})}
        />

        <FormField
          title="Surname"
          value={form.surname}
          handleChangeText={(e) => setForm({ ...form, surname: e})}
        />

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e})}
          keyboardType="email-address"
        />

        <DateField 
          title="Date of Birth"
          value={form.DOB}
          handleChangeDate={(date) => setForm({ ...form, DOB: date })}
        />

      </View>

      <View style={styles.signin}>
        <CustomButton 
          title="Continue"
          handlePress={() => {router.replace('/work')}}
        />
        <Text style={styles.bottomtext}>Already have an account? <Text style={styles.link} onPress={() => {router.push('/sign-in')}}>Sign In</Text></Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
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
    gap: 50,
  }
})

export default aboutYou;