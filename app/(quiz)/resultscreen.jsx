import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import CustomButton from '../../components/CustomButton';

import { useQuiz } from '../../contexts/QuizContext';

const ResultScreen = () => {
  const { score } = useLocalSearchParams();
  const router = useRouter();
  const passThreshold = 8; // Set passing score
  const { resetQuiz } = useQuiz();

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>
        {parseInt(score) >= passThreshold ? "Congratulations! You Passed!" : "Sorry, You Need to re-take the test."}
      </Text>
      <Text style={styles.scoreText}>Your Score: {score}</Text>
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  passText: {
    color: '#4CAF50', // Green color for pass
  },
  failText: {
    color: '#F44336', // Red color for fail
  },
  scoreText: {
    fontSize: 20,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default ResultScreen;