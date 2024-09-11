import React, { useRef, useEffect, useState, Alert } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import CustomButton from '../../components/CustomButton';
import { useQuiz } from '../../contexts/QuizContext';

import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

import { SERVER_URL } from '../../config'

import axios from 'axios';

const ResultScreen = () => {
  const router = useRouter();
  const passThreshold = 90;
  const { resetQuiz, score } = useQuiz();
  const confettiRef = useRef(null);
  const [staffID, setStaffID] = useState(null);
  const { percentScore } = useLocalSearchParams();

  // get staff ID
  useEffect(() => {
    const getStaffID = async () => {
      try {
        const accessToken = await SecureStore.getItemAsync('access_token');

        if (!accessToken) {
          Alert.alert('No access token found, please log out and log back in');
        }

        const decodedToken = jwtDecode(accessToken);
        setStaffID(decodedToken.staff_id);
      } catch (error) {
        Alert.alert('Error with your jwt token, please log out and log back in');
      }
    };

    getStaffID();
  }, []);

  // send score to backend when id is loaded
  useEffect(() => {
    const sendScore = async () => {
      try {
        const response = await axios.post(`${SERVER_URL}/add-score`, {
          staff_id: staffID,
          score: percentScore,
        });

        if (response.status === 201) {
          console.log('Score sent successfully');
        } else {
          Alert.alert('Error sending score, please try again');
        }
      } catch (error) {
        Alert.alert('Error sending score, please try again');
      }
    };

    if (staffID) {
      sendScore();
    }

  }, [staffID, score]);

  return (
    <View style={styles.container}>
      
      <Text
        style={[
          styles.resultText,
          percentScore >= passThreshold ? styles.passText : styles.failText,
        ]}
      >
        {percentScore >= passThreshold ? "Congratulations! You Passed!" : "Sorry, you didn't meet the pass mark"}
      </Text>
      <Text style={styles.scoreText}>Your Score: {percentScore} %</Text>
      
      {percentScore < passThreshold && (
        <Text style={styles.referencetext}>
          Reference our learning resources and try again!
        </Text>
      )}

      <CustomButton
        title="Back To Home"
        handlePress={() => {
          resetQuiz();
          router.back();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 100,
    backgroundColor: '#f5f5f5',
  },
  resultText: {
    fontSize: 28,
    fontFamily: 'Poppins-Regular',
    marginBottom: 15,
    textAlign: 'center',
  },
  passText: {
    color: '#4CAF50', // Green color for pass
  },
  failText: {
    color: '#F44336', // Red color for fail
  },
  referencetext: {
    fontSize: 18,
    fontFamily: 'Poppins-thin',
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default ResultScreen;