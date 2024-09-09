import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';

import FormField from '../../components/FormField';
import DateField from '../../components/DateField';
import CustomButton from '../../components/CustomButton';

import { useFormContext } from '../../contexts/FormContext';

const aboutYou = () => {
  const { formData, setFormData } = useFormContext();
  const [form, setForm] = useState(formData);

  const isFormComplete = form.name && form.surname && form.email && form.DOB;

  const handleContinue = () => {
    if (isFormComplete) {
      setFormData({ ...formData, ...form });
      router.push('/work');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>About You</Text>

      <View style={styles.forms}>
        <FormField
          title="Name"
          value={form.name}
          handleChangeText={(e) => setForm({ ...form, name: e })}
        />

        <FormField
          title="Surname"
          value={form.surname}
          handleChangeText={(e) => setForm({ ...form, surname: e })}
        />

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
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
          handlePress={handleContinue}
          style={{ opacity: isFormComplete ? 1 : 0.5 }}
          disabled={!isFormComplete}
        />
      </View>
    </SafeAreaView>
  );
};

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
    gap: 50,
  },
});

export default aboutYou;