import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import CustomDropdown from '../../components/CustomDropdown';
import axios from 'axios'

import { useFormContext } from '../../contexts/FormContext';

import { SERVER_URL } from '../../config'

const work = () => {
  const { formData, setFormData } = useFormContext();
  const [form, setForm] = useState({
    country: formData.country || '',
    company: formData.company || '',
    branch: formData.branch || '',
  });

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');

  const [countries, setCountries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const [isCountrySelected, setIsCountrySelected] = useState(false);
  const [isCompanySelected, setIsCompanySelected] = useState(false);
  const [isBranchSelected, setIsBranchSelected] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Fetch countries from backend
    axios.get(`${SERVER_URL}/api/countries`)
      .then(response => setCountries(response.data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    // Fetch companies from backend

    // Dont get list if country has been reset/empty
    if (selectedCountry === '' || selectedCountry === null) {
      return;
    }

    axios.get(`${SERVER_URL}/api/companies`, {
      params: {
        country: selectedCountry,
      }
    })
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));
  }, [selectedCountry]);

  useEffect(() => {
    // Fetch branches from backend

    // Dont get list if company has been reset/empty
    if (selectedCompany === '' || selectedCompany === null) {
      return;
    }

    axios.get(`${SERVER_URL}/branches`, {
      params: {
        country: selectedCountry,
        company: selectedCompany,
      }
    })
      .then(response => setBranches(response.data))
      .catch(error => console.error('Error fetching branches:', error));
  }, [selectedCompany]);

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

  handleCountrySelect = (value) => {
    setSelectedCountry(value);
    handleSelect('country', value);
    setIsCountrySelected(true);

    // reset values for company and branch

    setSelectedCompany('');
    handleSelect('company', '');
    setIsCompanySelected(false);

    setSelectedBranch('');
    handleSelect('branch', '');
    setIsBranchSelected(false);
  }


  handleCompanySelect = (value) => {
    setSelectedCompany(value);
    handleSelect('company', value);
    setIsCompanySelected(true);

    // reset values for branch

    setSelectedBranch('');
    handleSelect('branch', '');
    setIsBranchSelected(false);
  }


  handleBranchSelect = (value) => {
    setSelectedBranch(value);
    handleSelect('branch', value);
    setIsBranchSelected(true);
  }

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
          value={selectedCountry}
          onSelect={(value) => handleCountrySelect(value)}
        />

        <CustomDropdown
          category="Company"
          data={companies.map(company => ({ label: company, value: company }))}
          value={selectedCompany}
          onSelect={(value) => handleCompanySelect(value)}
          disabled={!isCountrySelected}
        />

        <CustomDropdown
          category="Branch"
          data={branches.map(branch => ({ label: branch, value: branch }))}
          value={selectedBranch}
          onSelect={(value) => handleBranchSelect(value)}
          disabled={!isCompanySelected}
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