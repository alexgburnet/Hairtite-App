import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ConfettiCannon from 'react-native-confetti-cannon';

import CustomButton from '../../components/CustomButton';
import { useQuiz } from '../../contexts/QuizContext';

const ResultScreen = () => {
  const { score } = useLocalSearchParams();
  const router = useRouter();
  const passThreshold = 8; // Set passing score
  const { resetQuiz } = useQuiz();
  const confettiRef = useRef(null);

  // Trigger confetti if the user passes
  React.useEffect(() => {
    if (parseInt(score) >= passThreshold && confettiRef.current) {
      confettiRef.current.start();
    }
  }, [score, passThreshold]);

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <ConfettiCannon
        ref={confettiRef}
        count={400}
        origin={{ x: screenWidth / 2, y: 0 }}
        fadeOut
        explosionSpeed={500}
        // Customize other properties as needed
      />
      <Text
        style={[
          styles.resultText,
          parseInt(score) >= passThreshold ? styles.passText : styles.failText,
        ]}
      >
        {parseInt(score) >= passThreshold ? "Congratulations! You Passed!" : "Sorry, you didn't meet the pass mark"}
      </Text>
      <Text style={styles.scoreText}>Your Score: {score} / {passThreshold}</Text>
      
      {parseInt(score) < passThreshold && (
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