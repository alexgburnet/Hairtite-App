import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import { Dropdown } from 'react-native-element-dropdown';

import FormField from '../../components/FormField'
import DateField from '../../components/DateField';
import CustomButton from '../../components/CustomButton'
import CustomDropdown from '../../components/CustomDropdown';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const work = () => {
  const [form, setForm] = useState({
    country: '',
    company: '',
    branch: '',
  })

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Where You Work</Text>
      
      <View style={styles.forms}>

        <CustomDropdown
          category="Country"
          data={data}
        />

        <CustomDropdown
          category="Company"
          data={data}
        />

        <CustomDropdown
          category="Branch"
          data={data}
        />

      </View>

      <View style={styles.signin}>
        <CustomButton 
          title="Continue"
          handlePress={() => {router.replace('/password')}}
        />
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
    gap: 80,
  }
})

export default work;