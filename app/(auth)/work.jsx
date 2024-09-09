import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import CustomDropdown from '../../components/CustomDropdown';

import { useFormContext } from '../../contexts/FormContext';

const work = () => {
  const { formData, setFormData } = useFormContext();
  const [form, setForm] = useState({
    country: formData.country || '',
    company: formData.company || '',
    branch: formData.branch || '',
  });

  const [countries, setCountries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Fetch countries from backend
    fetch('http://127.0.0.1:5000/api/countries')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));

    // Fetch companies from backend
    fetch('http://127.0.0.1:5000/api/companies')
      .then(response => response.json())
      .then(data => setCompanies(data))
      .catch(error => console.error('Error fetching companies:', error));

    // Fetch branches from backend
    fetch('http://127.0.0.1:5000/api/branches')
      .then(response => response.json())
      .then(data => setBranches(data))
      .catch(error => console.error('Error fetching branches:', error));
  }, []);

  useEffect(() => {
    // Extract data from router state
    const { state } = router;
    if (state?.formData) {
      console.log('Form data recieved:', state.formData);
      //setForm(state.formData);
    }
  }, [router]);

  useEffect(() => {
    const { country, company, branch } = form;
    setIsFormComplete(!!country && !!company && !!branch);
  }, [form]);

  const handleSelect = (category, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [category]: value,
    }));
  };

  const handleContinue = () => {
    if (isFormComplete) {
      setFormData({ ...formData, ...form });
      router.replace('/password');
    } else {
      console.log('Please fill out all fields');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Where You Work</Text>
      
      <View style={styles.forms}>
        <CustomDropdown
          category="Country"
          data={countries.map(country => ({ label: country, value: country }))}
          onSelect={(value) => handleSelect('country', value)}
        />

        <CustomDropdown
          category="Company"
          data={companies.map(company => ({ label: company, value: company }))}
          onSelect={(value) => handleSelect('company', value)}
        />

        <CustomDropdown
          category="Branch"
          data={branches.map(branch => ({ label: branch, value: branch }))}
          onSelect={(value) => handleSelect('branch', value)}
        />
      </View>

      <View style={styles.signin}>
        <CustomButton 
          title="Continue"
          handlePress={handleContinue}
          style={{ opacity: isFormComplete ? 1 : 0.5 }} // Optional: change button style if disabled
          disabled={!isFormComplete} // Disable button if form is incomplete
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
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
    gap: 80,
  },
});

export default work;